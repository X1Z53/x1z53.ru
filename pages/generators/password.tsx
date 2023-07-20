import { Button } from "@chakra-ui/react"
import { CheckBox, InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { generators } from "databases"
import { useToggle } from "features/hooks"
import { getDatabaseObject } from "features/utils"
import { useEffect, useState } from "react"

export default function Password() {
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

  useEffect(() => {
    setAlphabet(
      (useLowerCase ? lower : "")
      + (useUpperCase ? upper : "")
      + (useNumbers ? numbers : "")
      + (useSpecialSymbols ? specialSymbols : "")
    )
  }, [useCustomAlphabet])

  const generatePassword = () => Array.from({ length: length },
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  ).join("")

  useEffect(() => { setResult(generatePassword()) }, [
    length,
    useLowerCase,
    useUpperCase,
    useNumbers,
    useSpecialSymbols,
    useCustomAlphabet,
    alphabet
  ])

  const generator = getDatabaseObject(generators, "password")

  return <PageCreator {...generator}>
    <StandardGrid>
      <InputField type="number" title="Длина" value={length.toString()} callback={setLength} />
      <Button onClick={() => setResult(generatePassword())}>Сгенерировать</Button>
      <CheckBox title="Свой алфавит" value={useCustomAlphabet} callback={toggleUseCustomAlphabet} />
    </StandardGrid>
    {
      useCustomAlphabet ? <InputField
        type="text"
        title="Алфавит"
        value={alphabet}
        callback={setAlphabet}
        styles={{ marginBottom: 4 }}
      /> : <StandardGrid>
        <CheckBox title="Прописные буквы" value={useLowerCase} callback={toggleUseLowerCase} />
        <CheckBox title="Заглавные буквы" value={useUpperCase} callback={toggleUseUpperCase} />
        <CheckBox title="Цифры" value={useNumbers} callback={toggleUseNumbers} />
        <CheckBox title="Прописные буквы" value={useSpecialSymbols} callback={toggleUseSpecialSymbols} />
      </StandardGrid>
    }
    <InputField type="text" title="Результат" copyButton readOnly value={result} />
  </PageCreator>
}
