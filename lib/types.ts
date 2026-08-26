export type Plataforma = 'amazon' | 'shopee'

export interface Produto {
  id: string
  nome: string
  plataforma: Plataforma
  categoria: string
  preco: number
  link_afiliado: string
  imagem_url: string
  video_url: string | null
  destaque: boolean
  criado_em: string
}
