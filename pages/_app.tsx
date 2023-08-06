import { Box, ChakraProvider, Container, extendTheme } from "@chakra-ui/react"
import { Footer, Header } from "components"
import { AppProps } from "next/app"
import { Fira_Code } from "next/font/google"
import { useRouter } from "next/router"
import { createContext } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { MouseTransition, MultiBackend, TouchTransition } from "react-dnd-multi-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { Provider } from "react-redux"
import { legacy_createStore as createStore } from "redux"
import { rootReducer } from "store"

const font = Fira_Code({
  subsets: ["latin", "cyrillic"],
  display: "swap"
})
export const LocaleContext = createContext("ru")

const store = createStore(rootReducer)
const CustomHTML5toTouch = {
  backends: [
    {
      id: "HTML5Backend",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "TouchBackend",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      transition: TouchTransition,
      skipDispatchOnTransition: true
    }
  ]
}

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={extendTheme({
    fonts: {
      body: font.style.fontFamily,
      heading: font.style.fontFamily
    },
    config: { initialColorMode: "dark" }
  })}>
    <LocaleContext.Provider value={useRouter().locale}>
      <Provider store={store}>
        <DndProvider backend={MultiBackend} options={CustomHTML5toTouch}>
          <Box>
            <Header />
            <Container minHeight={"80vh"} paddingY={5} maxWidth="container.xl">
              <Component {...pageProps} />
            </Container>
            <Footer />
          </Box>
        </DndProvider>
      </Provider>
    </LocaleContext.Provider>
  </ChakraProvider >
}