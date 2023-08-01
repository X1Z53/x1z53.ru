import { Box, ChakraProvider, Container, extendTheme } from "@chakra-ui/react"
import { Footer, Header } from "components"
import { AppProps } from "next/app"
import { Fira_Code } from "next/font/google"
import { useRouter } from "next/router"
import { createContext } from "react"


const font = Fira_Code({
  subsets: ["latin", "cyrillic"],
  display: "swap"
})
export const LocaleContext = createContext("ru")

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={extendTheme({
    fonts: {
      body: font.style.fontFamily,
      heading: font.style.fontFamily
    },
    config: { initialColorMode: "dark" }
  })}>
    <LocaleContext.Provider value={useRouter().locale}>
      <Box>
        <Header />
        <Container minHeight={"80vh"} paddingY={5} maxWidth="container.xl">
          <Component {...pageProps} />
        </Container>
        <Footer />
      </Box>
    </LocaleContext.Provider>
  </ChakraProvider>
}