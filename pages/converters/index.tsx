import { Spinner } from "@chakra-ui/react"
import { CardGrid } from "components/layout"
import { getDatabase } from "features/hooks"

export default function Converters() {
  const { data, isLoading } = getDatabase("converters")
  return isLoading ? <Spinner /> : <CardGrid cards={data} />
}