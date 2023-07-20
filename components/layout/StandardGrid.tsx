import { SimpleGrid } from "@chakra-ui/react"

export default function StandardGrid({children}: {children: React.ReactNode}) { return <SimpleGrid columns={[1, 1, 2]} spacing={4} marginY={4} alignItems="center">{children}</SimpleGrid> }