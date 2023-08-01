import { CardGrid, PageGenerator } from "components"
import { about, pages } from "databases"
import { getLocaled, getLocaledTitles } from "modules"

export default function About() {
  const titles = getLocaledTitles()
  const developer = getLocaled(about).map(card => card.category === "developer" && card).filter(card => card)
  const site = getLocaled(about).map(card => card.category === "site" && card).filter(card => card)

  return <PageGenerator database={pages} name="about">
    {titles.developer}
    <CardGrid isExternal cards={developer} />
    {titles.site}
    <CardGrid isExternal cards={site} />
  </PageGenerator>
}