
export type CardGridProps = {
  cardWidth?: string,
  isExternal?: boolean,
  cards: { title: string, description: string, name: string, url?: string }[]
}
export type StandardGridProps = {
  children: React.ReactNode
  columns?: number[] | number
  styles?: any
}
