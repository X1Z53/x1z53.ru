import { CardGrid } from "components/layout"
import getDatabase from "modules/hooks/getDatabase"

export default function CiphersIndexPage() {
  const converters = getDatabase("converters")
  return <CardGrid cards={converters} />
}