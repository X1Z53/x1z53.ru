import { CardGrid } from "components/layout"
import { getDatabase } from "modules/hooks"

export default function IndexPage() {
  const titles = {
    ciphers: getDatabase("ciphers").map(({ title }) => title),
    converters: getDatabase("converters").map(({ title }) => title),
    generators: getDatabase("generators").map(({ title }) => title)
  }
  const pages = getDatabase("pages").map(page => ({ ...page, description: titles[page.name] ? titles[page.name].join(", ") : "" }))
  return <CardGrid cards={pages} />
}