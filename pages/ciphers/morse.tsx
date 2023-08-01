import { InputField, PageGenerator, StandardGrid, ToggleButtonGroup } from "components"
import { ciphers, morse as alphabets } from "databases"
import { getDatabaseObject, getLocaled, morse } from "modules"
import { useEffect, useState } from "react"

export default function Morse() {
  const { textTitle, resultTitle, methodButtons, alphabetButtons } = getLocaled({
    ru: { textTitle: "Текст", resultTitle: "Результат", methodButtons: ["Зашифровать", "Расшифровать"], alphabetButtons: ["Латиница", "Кириллица"] },
    en: { textTitle: "Text", resultTitle: "Result", methodButtons: ["Encrypt", "Decrypt"], alphabetButtons: ["Latin", "Cyrillic"] }
  })
  const { cyrillic, latin, symbols } = alphabets
  const alphabet = [...cyrillic, ...latin, ...symbols]
  const latinAlphabet = [...latin, ...symbols]
  const cyrillicAlphabet = [...cyrillic, ...symbols]
  const [text, setText] = useState("Hello, World!")
  const [methodButton, setMethodButton] = useState(methodButtons[0])
  const [alphabetButton, setAlphabetButton] = useState(alphabetButtons[0])
  const [result, setResult] = useState("")

  useEffect(() => {
    setResult(
      methodButtons.indexOf(methodButton)
        ? morse(text.split(" "), 0, alphabetButtons.indexOf(alphabetButton) ? cyrillicAlphabet : latinAlphabet).join("")
        : morse(text.split(""), 1, alphabet).join(" ")
    )
  }, [text, methodButton, alphabetButton])

  return <PageGenerator {...getDatabaseObject(getLocaled(ciphers), "morse")}>
    <StandardGrid>
      <InputField title={textTitle} type="text" value={text} onChange={setText} alphabet={alphabet.map(({ char }) => char).join("")} />
      <InputField title={resultTitle} type="text" readOnly copyButton value={result} />
      <ToggleButtonGroup buttons={methodButtons} onChange={setMethodButton} />
      {!!methodButtons.indexOf(methodButton) && <ToggleButtonGroup buttons={alphabetButtons} onChange={setAlphabetButton} />}
    </StandardGrid>
  </PageGenerator>
}