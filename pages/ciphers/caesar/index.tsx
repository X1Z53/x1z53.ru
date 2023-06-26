import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import AdaptiveInputField from "../../../components/AdaptiveInputField"
import ToggleButtonGroup from "../../../components/buttons/ToggleButtonGroup"
import Caesar from "../../../components/ciphers/Caesar"

export default function CaesarPage() {
  const methods = ["Encrypt", "Decrypt"]
  const [method, setMethod] = useState(methods[0])
  const [text, setText] = useState("Hello, World!")
  const [key, setKey] = useState("3")
  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz")
  const result = Caesar(text, key, alphabet, method)

  return <>
    <Heading>Шифр Цезаря</Heading>
    <Text paddingBottom="4">
      Шифр Цезаря — это вид шифра подстановки, в котором каждый символ в исходного текста заменяется символом,
      находящимся на некотором постоянном числе позиций левее или правее него в алфавите
    </Text>
    <SimpleGrid columns={2} spacing="4" marginBottom="4">
      <AdaptiveInputField type="text" title="Текст" value={text} callback={setText} />
      <AdaptiveInputField type="text" title="Алфавит" value={alphabet} callback={setAlphabet} />
      <AdaptiveInputField type="number" title="Ключ" value={key} callback={setKey} />
      <ToggleButtonGroup buttons={methods} callback={setMethod} />
    </SimpleGrid>
    <Flex justify="center">
      <AdaptiveInputField styles={{ width: "50%" }} type="text" readOnly copyButton value={result} title="Результат" />
    </Flex >
  </>
}