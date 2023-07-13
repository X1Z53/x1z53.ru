import { Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import { CheckBox, InputField } from "components/form"
import { useToggle } from "modules/hooks"
import { useEffect, useState } from "react"

export default function passwordGenerator() {
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

  function generatePassword() {
    return Array.from({ length: length },
      () => alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join("")
  }

  useEffect(() => {
    setAlphabet(
      (useLowerCase ? lower : "")
      + (useUpperCase ? upper : "")
      + (useNumbers ? numbers : "")
      + (useSpecialSymbols ? specialSymbols : "")
    )
  }, [useCustomAlphabet])

  useEffect(() => {setResult(generatePassword())}, [
    length,
    useLowerCase,
    useUpperCase,
    useNumbers,
    useSpecialSymbols,
    useCustomAlphabet,
    alphabet
  ])

  return <Heading>
    <SimpleGrid columns={[1, 1, 2]} spacing={4} marginBottom={4} alignItems="center">
      <InputField type="number" title="Длина" value={length.toString()} callback={setLength} />
      <Button onClick={() => setResult(generatePassword())}>Сгенерировать</Button>
    </SimpleGrid>
    <CheckBox title="Свой алфавит" value={useCustomAlphabet} callback={toggleUseCustomAlphabet} />
    {
      useCustomAlphabet ? <InputField
        type="text"
        title="Алфавит"
        value={alphabet}
        callback={setAlphabet}
        styles={{ marginBottom: 4 }}
      /> : <SimpleGrid columns={2} spacing={4} marginBottom={4}>
        <CheckBox title="Прописные буквы" value={useLowerCase} callback={toggleUseLowerCase} />
        <CheckBox title="Заглавные буквы" value={useUpperCase} callback={toggleUseUpperCase} />
        <CheckBox title="Цифры" value={useNumbers} callback={toggleUseNumbers} />
        <CheckBox title="Прописные буквы" value={useSpecialSymbols} callback={toggleUseSpecialSymbols} />
      </SimpleGrid>
    }
    <Flex>
      <InputField type="text" title="Результат" copyButton readOnly value={result} />
    </Flex>
  </Heading >
}
