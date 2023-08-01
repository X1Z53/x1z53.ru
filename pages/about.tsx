import { Heading } from "@chakra-ui/react"
import { CardGrid, PageGenerator, StandardGrid } from "components"
import { about as database } from "databases"
import { getDatabaseObject, getLocaled } from "modules"

export default function About() {
  const about = getLocaled(database)

  const { header, developerTitle, siteTitle } = getLocaled({
    ru: {
      header: "О сайте",
      developerTitle: "Разработчик",
      siteTitle: "Сайт"
    },
    en: {
      header: "About",
      developerTitle: "Developer",
      siteTitle: "Site"
    }
  })
  const developer = about.map(card => card.category === "developer" && card).filter(card => card)
  const site = about.map(card => card.category === "site" && card).filter(card => card)

  return <PageGenerator {...getDatabaseObject(about, "about")}>
    <Heading>{header}</Heading>
    <StandardGrid columns={1}>
      {developerTitle}
      <CardGrid isExternal cards={developer} />
      {siteTitle}
      <CardGrid isExternal cards={site} />
    </StandardGrid>
  </PageGenerator>
}