import { CardGrid } from "components"
import * as allDatabases from "databases"


export default function Index() {
  const { pages, ...databases } = allDatabases
  
  const descriptions = Object.keys(databases).map(databaseName => (
    { [databaseName]: databases[databaseName].map(({ title }) => title).join(", ") }
  )).reduce((accumulator, current) => ({...accumulator, ...current}))

  const cards = pages.map((page) => ({...page, description: descriptions[page.name]}))
  
  return <CardGrid cards={cards} />
}