import Image from 'next/image'
import { Produto } from '@/lib/types'
import VideoEmbed from './VideoEmbed'

interface FeaturedProductProps {
  produto: Produto
}

const badgeColors: Record<string, string> = {
  amazon: 'bg-orange-100 text-orange-700',
  shopee: 'bg-red-100 text-red-700',
}

export default function FeaturedProduct({ produto }: FeaturedProductProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-8">
      <div className="relative w-full pt-[60%] sm:pt-[40%]">
        <Image
          src={produto.imagem_url}
          alt={produto.nome}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {produto.destaque && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            ★ Destaque
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="text-xl font-bold text-gray-800 flex-1">{produto.nome}</h2>
          <span className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full capitalize ${badgeColors[produto.plataforma]}`}>
            {produto.plataforma}
          </span>
        </div>
        <p className="text-2xl font-extrabold text-gray-900 mb-1">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
        </p>
        <span className="text-sm text-gray-400 block mb-4">{produto.categoria}</span>
        <VideoEmbed url={produto.video_url} />
        <a
          href={produto.link_afiliado}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 block text-center bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition text-base"
        >
          Comprar agora →
        </a>
      </div>
    </div>
  )
}
