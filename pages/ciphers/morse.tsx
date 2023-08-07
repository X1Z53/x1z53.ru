import {
  InputField,
  PageGenerator,
  StandardGrid,
  ToggleButtonGroup,
} from "components"
import { morse as alphabets, ciphers } from "databases"
import { getLocaled, getLocaledTitles, morse } from "modules"
import { useEffect, useState } from "react"

export default function Morse() {
  const { methodButtons, alphabetButtons } = getLocaled({
    ru: {
      methodButtons: ["Зашифровать", "Расшифровать"],
      alphabetButtons: ["Латиница", "Кириллица"],
    },
    en: {
      methodButtons: ["Encrypt", "Decrypt"],
      alphabetButtons: ["Latin", "Cyrillic"],
    },
  })
  const titles = getLocaledTitles()

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
        ? morse(
            text.split(" "),
            0,
            alphabetButtons.indexOf(alphabetButton)
              ? cyrillicAlphabet
              : latinAlphabet,
          ).join("")
        : morse(text.split(""), 1, alphabet).join(" "),
    )
  }, [text, methodButton, alphabetButton])

  return (
    <PageGenerator database={ciphers} name="morse">
      <StandardGrid>
        <InputField
          title={titles.text}
          type="text"
          value={text}
          onChange={setText}
          alphabet={alphabet.map(({ char }) => char).join("")}
        />
        <InputField
          title={titles.result}
          type="text"
          readOnly
          copyButton
          value={result}
        />
        <ToggleButtonGroup buttons={methodButtons} onChange={setMethodButton} />
        {!!methodButtons.indexOf(methodButton) && (
          <ToggleButtonGroup
            buttons={alphabetButtons}
            onChange={setAlphabetButton}
          />
        )}
      </StandardGrid>
    </PageGenerator>
  )
}
