import { ChakraProvider, Container } from "@chakra-ui/react"
import { type AppProps } from "next/app"
import Header from "../components/Header"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Header />
      <Container paddingY="5" maxWidth="container.lg">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}