import { ChakraProvider, Container } from "@chakra-ui/react"
import { Header } from "components"
import { Footer } from "components/layout"
import * as databases from "databases"
import { getDatabaseObject } from "features"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  const path = useRouter().asPath.split("/").slice(1)
  const titles = Object.values(databases).map(database => database.map(({ name, title }) => ({ name, title }))).flat()
  const title = path[0] ? path
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .map(
      pathPart => getDatabaseObject(titles, pathPart[0]?.toLowerCase() + pathPart.slice(1))?.title || pathPart
    ) : ["Главная"]

  return <ChakraProvider>
    <Head>
      <title>
        {title.join(" > ")}
      </title>
    </Head>
    <Header {...{ path, title }} />
    <Container minHeight="80dvh" paddingY={5} maxWidth="container.xl">
      <Component {...pageProps} />
    </Container>
    <Footer />
  </ChakraProvider>
}