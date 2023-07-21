import { InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { ciphers } from "databases"
import { cyrillic, latin, symbols } from "databases/ciphers/morse"
import { getDatabaseObject } from "features/utils"
import { useState } from "react"

export default function Morse() {
  const [text, setText] = useState("Hello, World!")

  const alphabet = [...cyrillic, ...latin, ...symbols]

  const result = text
    .split("")
    .map(
      symbol => alphabet.map(({ char }) => char).includes(symbol.toUpperCase())
        ? alphabet.find(({ char }) => char === symbol.toUpperCase()).morse
        : symbol
    )
    .join(" ")

  const cipher = getDatabaseObject(ciphers, "morse")

  return <PageCreator {...cipher}>
    <StandardGrid>
      <InputField title="Текст" type="text" value={text} onChange={setText} alphabet={alphabet.map(({ char }) => char).join("")} />
      <InputField title="Результат" type="text" readOnly copyButton value={result} />
    </StandardGrid>
  </PageCreator>
}