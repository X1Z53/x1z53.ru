import { SimpleGrid } from "@chakra-ui/react"

export default function StandardGrid({ children, columns }: { children: React.ReactNode, columns?: number[] | number }) { return <SimpleGrid columns={columns || [1, 1, 2]} spacing={4} marginY={4} alignItems="center">{children}</SimpleGrid> }