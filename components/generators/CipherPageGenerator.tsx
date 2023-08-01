import { InputField, PageGenerator, StandardGrid, ToggleButtonGroup } from "components"
import { ciphers } from "databases"
import { getDatabaseObject, getLocaled } from "modules"
import * as allCiphers from "modules/ciphers"
import { useState } from "react"
import { CipherPageGeneratorProps } from "types"

export default function CipherPageGenerator({
  name,
  haveKey = false, numericKey = false,
  haveDecrypt = false,
  haveAlphabet = false
}: CipherPageGeneratorProps) {
  const cipher = allCiphers[name]
  const { alphabetTitle, textTitle, keyTitle, resultTitle, buttons } = getLocaled({
    ru: { alphabetTitle: "Алфавит", textTitle: "Текст", keyTitle: "Ключ", resultTitle: "Результат", buttons: ["Зашифровать", "Расшифровать"] },
    en: { alphabetTitle: "Alphabet", textTitle: "Text", keyTitle: "Key", resultTitle: "Result", buttons: ["Encrypt", "Decrypt"] }
  })

  const [text, setText] = useState("Hello, World!")
  const [method, setMethod] = useState(buttons[0])
  const [key, setKey] = useState(numericKey ? "3" : "key")
  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz")
  const result = cipher({ text, alphabet, key, isDecrypt: buttons.indexOf(method) })

  return <PageGenerator {...getDatabaseObject(getLocaled(ciphers), name)}>
    <StandardGrid>
      <InputField type="text" title={textTitle} value={text} onChange={setText} />
      {haveAlphabet && <InputField type="text" title={alphabetTitle} value={alphabet} onChange={setAlphabet} />}
      {
        haveKey && <InputField
          {...{ alphabet }}
          type={numericKey ? "number" : "text"}
          title={keyTitle}
          includedInAlphabet={!numericKey}
          value={key.toString()}
          min={2}
          onChange={setKey}
        />
      }
      {haveDecrypt && <ToggleButtonGroup {...{ buttons }} onChange={setMethod} />}
    </StandardGrid>
    <InputField type="text" title={resultTitle} readOnly copyButton value={result} />
  </PageGenerator>
}