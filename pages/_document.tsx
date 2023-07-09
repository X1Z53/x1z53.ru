import { ColorModeScript, extendTheme } from "@chakra-ui/react"
import NextDocument, { Head, Html, Main, NextScript } from "next/document"

const theme = extendTheme({ config: { initialColorMode: "dark" } })

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="https://images.x1z53.ru/x1z53.svg" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}