import { SimpleGrid } from "@chakra-ui/react"
import { StandardGridProps } from "types"

export default function StandardGrid({ children, styles, columns }: StandardGridProps) {
  return <SimpleGrid columns={columns || [1, 1, 2]} spacing={4} marginY={4} alignItems="center" {...styles}>{children}</SimpleGrid>
}