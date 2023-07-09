import { Card, CardBody, CardHeader, Heading, SimpleGrid } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

export default function CardGrid({ cards }: { cards: { title: string, description: string, name: string }[] }) {
  const { asPath } = useRouter()
  return <SimpleGrid spacing="4" templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
    {cards.map(({ title, description, name }) => (
      <Card key="" size="sm" justify="center">
        <Link href={`${asPath}/${name}`}>
          <CardHeader textAlign="center" justifyContent="center">
            <Heading size="md">{title}</Heading>
          </CardHeader>
          <CardBody textAlign="center" justifyContent="center">{description}</CardBody>
        </Link>
      </Card>
    ))}
  </SimpleGrid >
}