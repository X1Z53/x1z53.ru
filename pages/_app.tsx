import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react"
import { Footer, Header } from "components"
import { AppProps } from "next/app"
import { Fira_Code } from "next/font/google"
import { useRouter } from "next/router"
import { createContext } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import {
  MouseTransition,
  MultiBackend,
  TouchTransition,
} from "react-dnd-multi-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { Provider } from "react-redux"
import { store } from "store"

const font = Fira_Code({
  subsets: ["latin", "cyrillic"],
  display: "swap",
})
export const LocaleContext = createContext("ru")

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DndProvider
      backend={MultiBackend}
      options={{
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
            skipDispatchOnTransition: true,
          },
        ],
      }}
    >
      <ChakraProvider
        theme={extendTheme({
          fonts: {
            body: font.style.fontFamily,
            heading: font.style.fontFamily,
          },
          config: { initialColorMode: "dark" },
        })}
      >
        <LocaleContext.Provider value={useRouter().locale}>
          <Provider store={store}>
            <Header />
            <Container minHeight={"80dvh"} paddingY={5} maxWidth="container.xl">
              <Component {...pageProps} />
            </Container>
            <Footer />
          </Provider>
        </LocaleContext.Provider>
      </ChakraProvider>
    </DndProvider>
  )
}
