import { Button } from "@chakra-ui/react"
import { CheckBox, InputField, PageGenerator, StandardGrid } from "components"
import { generators } from "databases"
import { getLocaledTitles, useToggle } from "modules"
import { useEffect, useState } from "react"

export default function Password() {
  const titles = getLocaledTitles()

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

  const generatePassword = () =>
    Array.from(
      { length: length },
      () => alphabet[Math.floor(Math.random() * alphabet.length)],
    ).join("")

  useEffect(() => {
    setAlphabet(
      (useLowerCase ? lower : "") +
        (useUpperCase ? upper : "") +
        (useNumbers ? numbers : "") +
        (useSpecialSymbols ? specialSymbols : ""),
    )
  }, [
    useCustomAlphabet,
    useLowerCase,
    useUpperCase,
    useNumbers,
    useSpecialSymbols,
  ])

  useEffect(() => {
    setResult(generatePassword())
  }, [length, useCustomAlphabet, alphabet])

  return (
    <PageGenerator database={generators} name="password">
      <StandardGrid>
        <InputField
          type="number"
          title={titles.length}
          value={length.toString()}
          onChange={setLength}
        />
        <Button onClick={() => setResult(generatePassword())}>
          {titles.generate}
        </Button>
        <CheckBox
          title={titles.customAlphabet}
          value={useCustomAlphabet}
          onChange={toggleUseCustomAlphabet}
        />
      </StandardGrid>
      {useCustomAlphabet ? (
        <InputField
          type="text"
          title={titles.alphabet}
          value={alphabet}
          onChange={setAlphabet}
          styles={{ marginBottom: 4 }}
        />
      ) : (
        <StandardGrid>
          <CheckBox
            title={titles.lowercase}
            value={useLowerCase}
            onChange={toggleUseLowerCase}
          />
          <CheckBox
            title={titles.uppercase}
            value={useUpperCase}
            onChange={toggleUseUpperCase}
          />
          <CheckBox
            title={titles.numbers}
            value={useNumbers}
            onChange={toggleUseNumbers}
          />
          <CheckBox
            title={titles.specialSymbols}
            value={useSpecialSymbols}
            onChange={toggleUseSpecialSymbols}
          />
        </StandardGrid>
      )}
      <InputField
        type="text"
        title={titles.result}
        copyButton
        readOnly
        value={result}
      />
    </PageGenerator>
  )
}
