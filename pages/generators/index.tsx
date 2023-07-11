import { CardGrid } from "components/layout"
import getDatabase from "modules/hooks/getDatabase"

export default function CiphersIndexPage() {
  const converters = getDatabase("generators")
  return <CardGrid cards={converters} />
}