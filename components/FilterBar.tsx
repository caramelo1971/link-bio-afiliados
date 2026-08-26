'use client'

import { useState } from 'react'

interface FilterBarProps {
  categorias: string[]
  plataformas: string[]
  onFilter: (filtro: { plataforma: string | null; categoria: string | null }) => void
}

export default function FilterBar({ categorias, plataformas, onFilter }: FilterBarProps) {
  const [plataforma, setPlataforma] = useState<string | null>(null)
  const [categoria, setCategoria] = useState<string | null>(null)

  function handlePlataforma(value: string | null) {
    const next = plataforma === value ? null : value
    setPlataforma(next)
    onFilter({ plataforma: next, categoria })
  }

  function handleCategoria(value: string | null) {
    const next = categoria === value ? null : value
    setCategoria(next)
    onFilter({ plataforma, categoria: next })
  }

  const pillBase = 'px-3 py-1.5 rounded-full text-sm font-medium border transition cursor-pointer'
  const pillActive = 'bg-gray-900 text-white border-gray-900'
  const pillInactive = 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setPlataforma(null); setCategoria(null); onFilter({ plataforma: null, categoria: null }) }}
          className={`${pillBase} ${!plataforma && !categoria ? pillActive : pillInactive}`}
        >
          Todos
        </button>
        {plataformas.map(p => (
          <button
            key={p}
            onClick={() => handlePlataforma(p)}
            className={`${pillBase} ${plataforma === p ? pillActive : pillInactive} capitalize`}
          >
            {p}
          </button>
        ))}
      </div>
      {categorias.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categorias.map(c => (
            <button
              key={c}
              onClick={() => handleCategoria(c)}
              className={`${pillBase} ${categoria === c ? pillActive : pillInactive} text-xs`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
