import { ChakraProvider, Container } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { Header } from "../components/layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Header />
        <Container paddingY="5" maxWidth="container.xl">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>
  )
}