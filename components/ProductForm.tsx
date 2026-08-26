'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Produto } from '@/lib/types'

const CATEGORIAS = ['Eletrônicos', 'Casa', 'Moda', 'Beleza', 'Esporte', 'Livros', 'Brinquedos', 'Outros']

interface ProductFormProps {
  produto?: Produto | null
  onSave: () => void
  onCancel?: () => void
}

const empty = {
  nome: '',
  plataforma: 'amazon' as const,
  categoria: 'Eletrônicos',
  preco: '',
  link_afiliado: '',
  imagem_url: '',
  video_url: '',
  destaque: false,
}

export default function ProductForm({ produto, onSave, onCancel }: ProductFormProps) {
  const [form, setForm] = useState({
    nome: produto?.nome ?? empty.nome,
    plataforma: produto?.plataforma ?? empty.plataforma,
    categoria: produto?.categoria ?? empty.categoria,
    preco: produto?.preco?.toString() ?? empty.preco,
    link_afiliado: produto?.link_afiliado ?? empty.link_afiliado,
    imagem_url: produto?.imagem_url ?? empty.imagem_url,
    video_url: produto?.video_url ?? empty.video_url,
    destaque: produto?.destaque ?? empty.destaque,
  })
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro(null)

    const payload = {
      nome: form.nome.trim(),
      plataforma: form.plataforma,
      categoria: form.categoria,
      preco: parseFloat(form.preco),
      link_afiliado: form.link_afiliado.trim(),
      imagem_url: form.imagem_url.trim(),
      video_url: form.video_url.trim() || null,
      destaque: form.destaque,
    }

    const { error } = produto
      ? await supabase.from('produtos').update(payload).eq('id', produto.id)
      : await supabase.from('produtos').insert(payload)

    if (error) {
      setErro(error.message)
    } else {
      onSave()
    }
    setLoading(false)
  }

  const input = 'w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
  const label = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-bold text-gray-800">
        {produto ? 'Editar produto' : 'Adicionar produto'}
      </h2>

      {erro && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{erro}</p>}

      <div>
        <label className={label}>Nome</label>
        <input required className={input} value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Plataforma</label>
          <select className={input} value={form.plataforma} onChange={e => setForm(f => ({ ...f, plataforma: e.target.value as 'amazon' | 'shopee' }))}>
            <option value="amazon">Amazon</option>
            <option value="shopee">Shopee</option>
          </select>
        </div>
        <div>
          <label className={label}>Categoria</label>
          <select className={input} value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}>
            {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Preço (R$)</label>
        <input required type="number" min="0" step="0.01" className={input} value={form.preco} onChange={e => setForm(f => ({ ...f, preco: e.target.value }))} />
      </div>

      <div>
        <label className={label}>Link afiliado</label>
        <input required type="url" className={input} value={form.link_afiliado} onChange={e => setForm(f => ({ ...f, link_afiliado: e.target.value }))} />
      </div>

      <div>
        <label className={label}>URL da imagem</label>
        <input required type="url" className={input} value={form.imagem_url} onChange={e => setForm(f => ({ ...f, imagem_url: e.target.value }))} />
      </div>

      <div>
        <label className={label}>URL do vídeo (YouTube — opcional)</label>
        <input type="url" className={input} value={form.video_url} onChange={e => setForm(f => ({ ...f, video_url: e.target.value }))} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="destaque"
          type="checkbox"
          className="w-4 h-4"
          checked={form.destaque}
          onChange={e => setForm(f => ({ ...f, destaque: e.target.checked }))}
        />
        <label htmlFor="destaque" className="text-sm text-gray-700">Colocar em destaque no topo</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gray-900 text-white font-medium py-2.5 rounded-xl hover:bg-gray-700 transition disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl hover:bg-gray-50 transition">
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
