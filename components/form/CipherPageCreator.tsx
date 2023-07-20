import { InputField, ToggleButtonGroup } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { ciphers } from "databases"
import * as allCiphers from "features/utils"
import { getDatabaseObject } from "features/utils"
import { useState } from "react"

type Cipher = {
  name: string
  haveKey?: boolean
  numericKey?: boolean
  haveDecrypt?: boolean
  haveAlphabet?: boolean
}

export default function Cipher({
  name,
  haveKey = false, numericKey = false,
  haveDecrypt = false,
  haveAlphabet = false
}: Cipher) {
  const buttons = ["Зашифровать", "Расшифровать"]
  const cipher = allCiphers[name]

  const [text, setText] = useState("Hello, World!")
  const [method, setMethod] = useState(buttons[0])
  const [key, setKey] = useState(numericKey ? "3" : "key")
  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz")
  const result = cipher({ text, alphabet, key, isDecrypt: buttons.indexOf(method) })

  const cipherProps = getDatabaseObject(ciphers, name)

  return <PageCreator {...cipherProps}>
    <StandardGrid>
      <InputField type="text" title="Текст" value={text} callback={setText} />
      {haveAlphabet && <InputField type="text" title="Алфавит" value={alphabet} callback={setAlphabet} />}
      {
        haveKey && <InputField
          type={numericKey ? "number" : "text"}
          title="Ключ"
          includedInAlphabet={!numericKey}
          value={key.toString()}
          alphabet={alphabet}
          minValue={2}
          callback={setKey}
        />
      }
      {haveDecrypt && <ToggleButtonGroup buttons={buttons} callback={setMethod} />}
    </StandardGrid>
    <InputField type="text" title="Результат" readOnly copyButton value={result} />
  </PageCreator>
}