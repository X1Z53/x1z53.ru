import { Spinner } from "@chakra-ui/react"
import { CardGrid } from "components/layout"
import { getDatabase } from "features/hooks"

export default function Ciphers() {
  const { data, isLoading } = getDatabase("ciphers")
  return isLoading ? <Spinner /> : <CardGrid cards={data} />
}