import { Spinner } from "@chakra-ui/react"
import { CardGrid } from "components/layout"
import getDatabase from "modules/hooks/getDatabase"

export default function CiphersIndexPage() {
  const { ciphers } = getDatabase()
  return ciphers ? <CardGrid cards={ciphers} /> : <Spinner />
}