import { CardGrid } from "components/layout"
import { getDatabase } from "modules/hooks"

export default function IndexPage() {
  const pages = getDatabase("pages")

  return <CardGrid cards={pages} />
}