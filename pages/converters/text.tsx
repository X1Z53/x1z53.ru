import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { InputField, CheckBox, ToggleButtonGroup } from "components/form"
import { getDatabase, useToggle } from "modules/hooks"
import { useEffect, useState } from "react"

export default function TextConverter() {
  const convertersParams = getDatabase("converters") || { title: "", description: "" }
  const { title, description } = convertersParams
  const buttons = ["Текст в Биты", "Биты в Текст"]
  const [method, setMethod] = useState(buttons[0])
  const [addUpToEightChars, toggleAddUpToEightChars] = useToggle(true)
  const [addSpacesBetween, toggleAddSpacesBetween] = useToggle(true)
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")
  function textToBinary(text) {
    const result = []
    for (const char of text) {
      const charCode = char.charCodeAt(0)
      const binaryCode = charCode.toString(2)
      const normalizedBinaryCode = addUpToEightChars ? binaryCode.padStart(8, "0") : binaryCode
      result.push(normalizedBinaryCode)
    }
    return addSpacesBetween ? result.join(" ") : result.join("")
  }

  function binaryToText(text) {
    const result = []
    for (const char of text.split(" ")) {
      result.push(String.fromCharCode(parseInt(char, 2)))
    }
    return result.join("")
  }

  useEffect(() => {
    setResult(buttons.indexOf(method) ? binaryToText(text) : textToBinary(text))
  }, [text, method, addSpacesBetween, addUpToEightChars])

  return <>
    <Heading>{title}</Heading>
    <Text paddingBottom="4">{description}</Text>
    <SimpleGrid columns={[1, 2]} spacing={4} marginBottom={4} alignItems="center">
      <InputField title="Число" type="text" value={text} callback={setText} />
      <ToggleButtonGroup buttons={buttons} callback={setMethod} />
      {
        !buttons.indexOf(method) && <>
          <CheckBox text="Дополонять до 8 цифр" value={addUpToEightChars} callback={toggleAddUpToEightChars} />
          <CheckBox text="Использовать пробелы" value={addSpacesBetween} callback={toggleAddSpacesBetween} />
        </>
      }
    </SimpleGrid>
    <InputField title="Результат" type="text" readOnly copyButton value={result} />
  </>
}