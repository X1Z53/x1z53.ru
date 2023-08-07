import { Heading, Text } from "@chakra-ui/react"
import { Description, StandardGrid } from "components"
import { getDatabaseObject, getLocaled } from "modules"
import { PageGeneratorProps } from "types"

export default function PageGenerator({
  database,
  name,
  children,
}: PageGeneratorProps) {
  const { title, description } = getDatabaseObject(getLocaled(database), name)

  return (
    <StandardGrid columns={1}>
      <Heading>{title}</Heading>
      <Description {...{ description }} />
      <Text>{description}</Text>
      {children}
    </StandardGrid>
  )
}
