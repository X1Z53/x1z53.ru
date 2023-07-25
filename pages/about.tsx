import { Heading } from "@chakra-ui/react"
import { CardGrid } from "components"
import { developer, site } from "databases/about"

export default function About() {
  return <>
    <Heading>О сайте</Heading>
    Разработчик
    <CardGrid isExternal cards={developer} cardWidth="200px" />
    Сайт
    <CardGrid isExternal cards={site} cardWidth="200px" />    
  </>
}