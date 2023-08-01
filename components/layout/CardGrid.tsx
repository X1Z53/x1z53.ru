import { Card, CardBody, CardHeader, Heading, SimpleGrid } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { CardGridProps } from "types"

export default function CardGrid({ cardWidth = "300px", isExternal, cards }: CardGridProps) {
  const { asPath } = useRouter()
  cards.sort(({ title: a }, { title: b }) => a > b ? 1 : a < b ? -1 : 0)

  return <SimpleGrid spacing={4} templateColumns={`repeat(auto-fill, minmax(${cardWidth}, 1fr))`}>
    {
      cards.map(({ title, description, name, url }) => (
        <Card key={name} size="sm" justify="center">
          <Link href={url || `${asPath.length - 1 ? asPath : ""}/${name}`} target={isExternal && "_blank"}>
            <CardHeader textAlign="center">
              <Heading fontWeight={"medium"} size="md">
                {title}
              </Heading>
            </CardHeader>
            <CardBody textAlign="center">
              {description || url}
            </CardBody>
          </Link>
        </Card>
      ))
    }
  </SimpleGrid >
}