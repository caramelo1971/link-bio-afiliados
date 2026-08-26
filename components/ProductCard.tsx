import Image from 'next/image'
import { Produto } from '@/lib/types'
import VideoEmbed from './VideoEmbed'

interface ProductCardProps {
  produto: Produto
}

const badgeColors: Record<string, string> = {
  amazon: 'bg-orange-100 text-orange-700',
  shopee: 'bg-red-100 text-red-700',
}

export default function ProductCard({ produto }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="relative w-full pt-[100%]">
        <Image
          src={produto.imagem_url}
          alt={produto.nome}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 flex-1">
            {produto.nome}
          </h3>
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${badgeColors[produto.plataforma]}`}>
            {produto.plataforma}
          </span>
        </div>
        <p className="text-lg font-bold text-gray-900 mb-1">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
        </p>
        <span className="text-xs text-gray-400 mb-3">{produto.categoria}</span>
        <VideoEmbed url={produto.video_url} />
        <a
          href={produto.link_afiliado}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-auto pt-3 block text-center bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-gray-700 transition"
        >
          Comprar agora →
        </a>
      </div>
    </div>
  )
}
