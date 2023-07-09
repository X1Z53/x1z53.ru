import { Text } from "@chakra-ui/react"
import { getUrl } from "modules/hooks"

export default function Test() {
  return <Text>{getUrl().test}</Text>
}
