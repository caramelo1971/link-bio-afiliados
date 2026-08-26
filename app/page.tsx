'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Produto } from '@/lib/types'
import FeaturedProduct from '@/components/FeaturedProduct'
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

  const destaque = filtrados.find(p => p.destaque) ?? filtrados[0] ?? null
  const grade = filtrados.filter(p => p.id !== destaque?.id)
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
    <main className="max-w-2xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Produtos Recomendados</h1>
        <p className="text-gray-500 mt-1">Selecionados com carinho para você</p>
      </header>

      {destaque && <FeaturedProduct produto={destaque} />}

      <FilterBar
        categorias={categorias}
        plataformas={plataformas}
        onFilter={handleFilter}
      />

      {grade.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {grade.map(produto => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-12">Nenhum produto encontrado.</p>
      )}
    </main>
  )
}
