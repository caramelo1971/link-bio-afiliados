'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Produto } from '@/lib/types'

export default function ProductCarousel({ produtos }: { produtos: Produto[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (produtos.length <= 1) return
    const timer = setInterval(() => setCurrent(i => (i + 1) % produtos.length), 3500)
    return () => clearInterval(timer)
  }, [produtos.length])

  if (produtos.length === 0) return null

  const produto = produtos[current]

  return (
    <div className="rounded-2xl overflow-hidden shadow-md mb-6 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="relative w-full pt-[65%]">
        <Image
          src={produto.imagem_url}
          alt={produto.nome}
          fill
          className="object-contain p-4"
          sizes="100vw"
          priority
        />
        {produto.destaque && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            ★ Destaque
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3">
          <p className="text-white font-bold text-base line-clamp-1">{produto.nome}</p>
          <p className="text-orange-300 font-extrabold text-lg">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
          </p>
        </div>
      </div>

      <div className="px-4 pt-3 pb-2">
        <a
          href={produto.link_afiliado}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block text-center bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
        >
          Comprar agora →
        </a>
      </div>

      {produtos.length > 1 && (
        <div className="flex justify-center gap-1.5 py-2">
          {produtos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-orange-500 w-4' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
