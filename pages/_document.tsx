import { ColorModeScript, Image } from "@chakra-ui/react"
import NextDocument, { Head, Html, Main, NextScript } from "next/document"

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <style>
            {`
              body {
                overflow: overlay
              }
          
              ::selection {
                background: slateGray
              }

              ::-webkit-tap-highlight {
                color: slateGray
              }

              ::-webkit-scrollbar {
                width: 8px;
                height: 8px
              }
          
              ::-webkit-scrollbar-thumb:hover {
                background-color: gray
              }
          
              ::-webkit-scrollbar-thumb {
                background-color: slateGray;
                border-radius: 20px;
                border: 1px solid transparent;
                background-clip: content-box
              }
            `}
          </style>
          <link rel="icon" type="image/png" href="https://images.x1z53.ru/x1z53.svg" />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(94312353, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `
            }} />
          <noscript><Image src="https://mc.yandex.ru/watch/94312353" position="absolute" left="-9999px" alt="" /></noscript>
        </body>
      </Html>
    )
  }
}