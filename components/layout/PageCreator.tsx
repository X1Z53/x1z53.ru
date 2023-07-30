import { Heading, Text } from "@chakra-ui/react"
import { Description } from "components/seo"

type PageCreator = {title: string, description?: string, children: React.ReactNode}

export default function PageCreator({title, description, children}: PageCreator) {
  return <>
    <Heading>{title}</Heading>
    <Description {...{ description }} />
    <Text>{description}</Text>
    {children}
  </>
}