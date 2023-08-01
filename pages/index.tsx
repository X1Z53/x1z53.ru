import { CardGrid } from "components"
import * as allDatabases from "databases/pages"
import { getLocaled, getReduced } from "modules"


export default function Index() {
  const { pages, ...databases } = getReduced(Object.keys(allDatabases).map(database => ({ [database]: getLocaled(allDatabases[database]) })))
  const descriptions = getReduced(
    Object.keys(databases).map(databaseName => (
      { [databaseName]: databases[databaseName].map(({ title }) => title).join(", ") }
    ))
  )

  const cards = pages
    .map((page) => page.name !== "about" && ({ ...page, description: descriptions[page.name] }))
    .filter(page => page)

  return <CardGrid cards={cards} />
}