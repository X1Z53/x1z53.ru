import { Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid } from "@chakra-ui/react"
import Link from "next/link"

export default function CardGrid({ cards }: { cards: { header: string, body: string, link: string, footer?: string }[] }) {
  return <SimpleGrid spacing="4" templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
    {cards.map(({ header, body, link, footer }) => (
      <Card key="" size="sm" justify="center">
        <Link href={link}>
          <CardHeader textAlign="center" justifyContent="center">{typeof header === "string" ? <Heading size="md">{header}</Heading> : header}</CardHeader>
          <CardBody textAlign="center" justifyContent="center">{body}</CardBody>
          <CardFooter textAlign="center" justifyContent="center">{footer ? footer : link}</CardFooter>
        </Link>
      </Card>
    ))}
  </SimpleGrid >
}