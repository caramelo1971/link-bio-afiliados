'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Produto } from '@/lib/types'
import ProductForm from '@/components/ProductForm'

export default function AdminPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [editando, setEditando] = useState<Produto | null | 'novo'>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  async function fetchProdutos() {
    const { data } = await supabase
      .from('produtos')
      .select('*')
      .order('criado_em', { ascending: false })
    if (data) setProdutos(data)
    setLoading(false)
  }

  useEffect(() => { fetchProdutos() }, [])

  async function deletar(id: string) {
    if (!confirm('Confirmar exclusão?')) return
    await supabase.from('produtos').delete().eq('id', id)
    fetchProdutos()
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const badgeColors: Record<string, string> = {
    amazon: 'bg-orange-100 text-orange-700',
    shopee: 'bg-red-100 text-red-700',
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Painel Admin</h1>
        <div className="flex gap-3">
          <a href="/" target="_blank" className="text-sm text-gray-500 hover:text-gray-800 underline">Ver página</a>
          <button onClick={logout} className="text-sm text-red-500 hover:text-red-700">Sair</button>
        </div>
      </header>

      {editando !== null ? (
        <div className="mb-8">
          <ProductForm
            produto={editando === 'novo' ? null : editando}
            onSave={() => { setEditando(null); fetchProdutos() }}
            onCancel={() => setEditando(null)}
          />
        </div>
      ) : (
        <button
          onClick={() => setEditando('novo')}
          className="w-full mb-8 border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-700 py-4 rounded-2xl font-medium transition"
        >
          + Adicionar produto
        </button>
      )}

      {loading ? (
        <p className="text-center text-gray-400">Carregando...</p>
      ) : (
        <div className="space-y-3">
          {produtos.map(produto => (
            <div key={produto.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={produto.imagem_url} alt={produto.nome} className="w-14 h-14 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{produto.nome}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${badgeColors[produto.plataforma]}`}>
                    {produto.plataforma}
                  </span>
                  <span className="text-xs text-gray-400">{produto.categoria}</span>
                  {produto.destaque && <span className="text-xs text-yellow-600 font-medium">★ Destaque</span>}
                </div>
                <p className="text-sm font-bold text-gray-700 mt-1">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => setEditando(produto)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletar(produto.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
