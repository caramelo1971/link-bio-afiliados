'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Produto } from '@/lib/types'
import ProductCarousel from '@/components/ProductCarousel'
import ProductCard from '@/components/ProductCard'
import FilterBar from '@/components/FilterBar'

export default function HomePage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [filtrados, setFiltrados] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProdutos() {
      const supabase = createClient()
      const { data } = await supabase
        .from('produtos')
        .select('*')
        .order('criado_em', { ascending: false })
      if (data) {
        setProdutos(data)
        setFiltrados(data)
      }
      setLoading(false)
    }
    fetchProdutos()
  }, [])

  function handleFilter({ plataforma, categoria }: { plataforma: string | null; categoria: string | null }) {
    let resultado = [...produtos]
    if (plataforma) resultado = resultado.filter(p => p.plataforma === plataforma)
    if (categoria) resultado = resultado.filter(p => p.categoria === categoria)
    setFiltrados(resultado)
  }

  const categorias = [...new Set(produtos.map(p => p.categoria))]
  const plataformas = [...new Set(produtos.map(p => p.plataforma))]

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-gray-200 rounded-2xl" />)}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative" style={{ background: 'linear-gradient(160deg, #fff7ed 0%, #eff6ff 100%)' }}>
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: 'url(/banner.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.06, zIndex: 0 }} />
      <div className="relative" style={{ zIndex: 1 }}>
      <header className="w-full bg-gradient-to-r from-orange-500 via-orange-400 to-blue-600 py-5 px-4 mb-6 flex flex-col items-center justify-center gap-1 shadow-lg">
        <span className="text-white font-black text-2xl sm:text-3xl tracking-tight drop-shadow-md">
          🛒 NL Caramelo Shop
        </span>
        <span className="text-orange-100 text-xs sm:text-sm font-medium tracking-wide">
          Qualidade · Confiança · Preço Justo
        </span>
      </header>
      <div className="max-w-2xl mx-auto px-4 pb-8">

      <ProductCarousel produtos={filtrados} />

      <FilterBar
        categorias={categorias}
        plataformas={plataformas}
        onFilter={handleFilter}
      />

      {filtrados.length > 0 ? (
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(4px)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filtrados.map(produto => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 py-12">Nenhum produto encontrado.</p>
      )}
      </div>
      </div>
    </main>
  )
}
