import { CardGrid } from "components/layout"
import { generators } from "databases"

export default function Generators() {
  return <CardGrid cards={generators} />
}