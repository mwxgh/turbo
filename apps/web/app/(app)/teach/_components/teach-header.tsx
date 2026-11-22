/** Title block of a teacher page. */
export function TeachHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-medium tracking-tight text-balance">
        {title}
      </h1>
      <p className="text-pretty text-muted-foreground">{description}</p>
    </div>
  )
}
