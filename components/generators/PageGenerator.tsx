import { Heading, Text } from "@chakra-ui/react"
import { Description } from "components"
import { PageGeneratorProps } from "types"

export default function PageGenerator({ title, description, children }: PageGeneratorProps) {
  return <>
    <Heading>{title}</Heading>
    <Description {...{ description }} />
    <Text>{description}</Text>
    {children}
  </>
}