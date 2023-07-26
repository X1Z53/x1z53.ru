import { InputField, PageCreator, StandardGrid, ToggleButtonGroup } from "components"
import { ciphers } from "databases"
import { cyrillic, latin, symbols } from "databases/ciphers/morse"
import { getDatabaseObject, morse, splitApplyJoin } from "features"
import { useEffect, useState } from "react"

export default function Morse() {
  const alphabet = [...cyrillic, ...latin, ...symbols]
  const latinAlphabet = [...latin, ...symbols]
  const cyrillicAlphabet = [...cyrillic, ...symbols]
  const [text, setText] = useState("Hello, World!")
  const encryptButtons = ["Зашифровать", "Расшифровать"]
  const alphabetButtons = ["Латиница", "Кириллица"]
  const [encryptButton, setEncryptButton] = useState(encryptButtons[0])
  const [alphabetButton, setAlphabetButton] = useState(alphabetButtons[0])
  const [result, setResult] = useState("")

  useEffect(() => {
    setResult(
      encryptButton === "Зашифровать"
        ? splitApplyJoin(text, "", " ", morse, [1, alphabet])
        : splitApplyJoin(text, " ", "", morse, [
          0,
          alphabetButton === "Латиница" ? latinAlphabet : cyrillicAlphabet
        ])
    )
  }, [text, encryptButton, alphabetButton])

  return <PageCreator {...getDatabaseObject(ciphers, "morse")}>
    <StandardGrid>
      <InputField title="Текст" type="text" value={text} onChange={setText} alphabet={alphabet.map(({ char }) => char).join("")} />
      <ToggleButtonGroup buttons={encryptButtons} onChange={setEncryptButton} />
      {encryptButton === "Расшифровать" && <ToggleButtonGroup buttons={alphabetButtons} onChange={setAlphabetButton} />}
    </StandardGrid>
    <InputField title="Результат" type="text" readOnly copyButton value={result} />
  </PageCreator>
}