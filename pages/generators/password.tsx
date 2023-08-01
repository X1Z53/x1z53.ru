import { Button } from "@chakra-ui/react"
import { CheckBox, InputField, PageGenerator, StandardGrid } from "components"
import { generators } from "databases"
import { getDatabaseObject, getLocaled, useToggle } from "modules"
import { useEffect, useState } from "react"

export default function Password() {
  const {
    lengthTitle, generateTitle, customAlphabetTitle, alphabetTitle,
    lowerCaseTitle, upperCaseTitle, numbersTitle, specialSymbolsTitle, resultTitle
  } = getLocaled({
    ru: {
      lengthTitle: "Длина",
      generateTitle: "Сгенерировать",
      customAlphabetTitle: "Изменённый алфавит",
      alphabetTitle: "Алфавит",
      lowerCaseTitle: "Строчные буквы",
      upperCaseTitle: "Прописные буквы",
      numbersTitle: "Цифры",
      specialSymbolsTitle: "Специальные символы",
      resultTitle: "Результат"
    },
    en: {
      lengthTitle: "Length",
      generateTitle: "Generate",
      customAlphabetTitle: "Custom alphabet",
      alphabetTitle: "Alphabet",
      lowerCaseTitle: "Lowercase letters",
      upperCaseTitle: "Uppercase letters",
      numbersTitle: "Numbers",
      specialSymbolsTitle: "Special symbols",
      resultTitle: "Result"
    }
  })

  const lower = "abcdefghijklmnopqrstuvwxyz"
  const upper = lower.toUpperCase()
  const numbers = "0123456789"
  const specialSymbols = "!@#$%^&*()_+~`|}{[]:;?><,./-="

  const [useLowerCase, toggleUseLowerCase] = useToggle(true)
  const [useUpperCase, toggleUseUpperCase] = useToggle(true)
  const [useNumbers, toggleUseNumbers] = useToggle(true)
  const [useSpecialSymbols, toggleUseSpecialSymbols] = useToggle(true)

  const [alphabet, setAlphabet] = useState("")

  const [useCustomAlphabet, toggleUseCustomAlphabet] = useToggle(false)

  const [length, setLength] = useState(12)
  const [result, setResult] = useState("")

  const generatePassword = () => Array.from({ length: length },
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  ).join("")

  useEffect(() => {
    setAlphabet(
      (useLowerCase ? lower : "")
      + (useUpperCase ? upper : "")
      + (useNumbers ? numbers : "")
      + (useSpecialSymbols ? specialSymbols : "")
    )
  }, [
    useCustomAlphabet,
    useLowerCase,
    useUpperCase,
    useNumbers,
    useSpecialSymbols
  ])

  useEffect(() => { setResult(generatePassword()) }, [
    length,
    useCustomAlphabet,
    alphabet
  ])

  return <PageGenerator {...getDatabaseObject(getLocaled(generators), "password")}>
    <StandardGrid>
      <InputField type="number" title={lengthTitle} value={length.toString()} onChange={setLength} />
      <Button onClick={() => setResult(generatePassword())}>{generateTitle}</Button>
      <CheckBox title={customAlphabetTitle} value={useCustomAlphabet} onChange={toggleUseCustomAlphabet} />
    </StandardGrid>
    {
      useCustomAlphabet
        ? <InputField
          type="text"
          title={alphabetTitle}
          value={alphabet}
          onChange={setAlphabet}
          styles={{ marginBottom: 4 }}
        />
        : <StandardGrid>
          <CheckBox title={lowerCaseTitle} value={useLowerCase} onChange={toggleUseLowerCase} />
          <CheckBox title={upperCaseTitle} value={useUpperCase} onChange={toggleUseUpperCase} />
          <CheckBox title={numbersTitle} value={useNumbers} onChange={toggleUseNumbers} />
          <CheckBox title={specialSymbolsTitle} value={useSpecialSymbols} onChange={toggleUseSpecialSymbols} />
        </StandardGrid>
    }
    <InputField type="text" title={resultTitle} copyButton readOnly value={result} />
  </PageGenerator>
}
