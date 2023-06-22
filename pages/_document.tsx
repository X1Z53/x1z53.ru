import { ColorModeScript, extendTheme } from "@chakra-ui/react"
import NextDocument, { Head, Html, Main, NextScript } from "next/document"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  }
})

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}