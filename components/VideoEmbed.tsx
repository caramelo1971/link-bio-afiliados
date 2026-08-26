interface VideoEmbedProps {
  url: string | null
}

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function VideoEmbed({ url }: VideoEmbedProps) {
  if (!url) return null

  const youtubeId = extractYoutubeId(url)

  if (youtubeId) {
    return (
      <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden mt-3">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="Vídeo do produto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
      </svg>
      Ver vídeo
    </a>
  )
}
