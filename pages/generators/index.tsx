import { Spinner } from "@chakra-ui/react"
import { CardGrid } from "components/layout"
import { getDatabase } from "features/hooks"

export default function Generators() {
  const { data, isLoading } = getDatabase("generators")
  return isLoading ? <Spinner /> : <CardGrid cards={data} />
}