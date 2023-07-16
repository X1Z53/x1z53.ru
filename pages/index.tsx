import { Spinner } from "@chakra-ui/react"
import { CardGrid } from "components/layout"
import { getDatabase } from "features/hooks"

export default function Index() {
  const { data, isLoading } = getDatabase("pages")
  const databases = ["ciphers", "converters", "generators", "textTools"]
  // const databases = data?.map(({ name }) => name)
  const titles = databases
    .map(name => ({
      [name]: getDatabase(name).data?.map(({ title }) => title).join(", ")
    }))
    .reduce((result, current) => ({ ...result, ...current }))
  const pages = data?.map(page => ({ ...page, description: titles[page.name] }))
  return isLoading ? <Spinner /> : <CardGrid cards={pages} />
}