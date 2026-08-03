import Link from "next/link"

interface EmptyStateProps {
  title?: string
  description?: string
  actionText?: string
  actionHref?: string
  emoji?: string
}

export function EmptyState({
  title = "No hay resultados",
  description = "Probá con otra búsqueda o categoría.",
  actionText = "Ver todos los servicios",
  actionHref = "/es/servicios",
  emoji = "🔍",
}: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="font-heading text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-foreground-light text-sm mb-6 max-w-md mx-auto">{description}</p>
      <Link
        href={actionHref}
        className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-primary-light transition-colors"
      >
        {actionText}
      </Link>
    </div>
  )
}
