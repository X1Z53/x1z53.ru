import { ChakraProvider, Container } from "@chakra-ui/react"
import { Header } from "components/layout"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  const path = useRouter().asPath.split("/").slice(1).map((part: string) => part.charAt(0).toUpperCase() + part.slice(1)).join(" - ") || "Main Page"
  return <ChakraProvider>
    <Head>
      <title>{path}</title>
    </Head>
    <Header />
    <Container paddingY="5" maxWidth="container.xl">
      <Component {...pageProps} />
    </Container>
  </ChakraProvider>
}