import { Flex, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import Copy from "../../../components/buttons/Copy"
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
      <InputGroup>
        <InputLeftAddon>Текст</InputLeftAddon>
        <Input value={text} onChange={event => setText(event.target.value)} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Алфавит</InputLeftAddon>
        <Input value={alphabet} onChange={event => setAlphabet(event.target.value)} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Ключ</InputLeftAddon>
        <Input value={key}
          onChange={event => setKey(event.target.value.split("").filter(i => "1234567890".includes(i)).join(""))}
        />
      </InputGroup>
      <ToggleButtonGroup buttons={methods} callback={setMethod} />
    </SimpleGrid>
    <Flex justify="center">
      <InputGroup width="50%">
        <InputLeftAddon>Результат</InputLeftAddon>
        <Input readOnly value={result} />
        <InputRightAddon padding="0">
          <Copy value={result} styles={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }} />
        </InputRightAddon>
      </InputGroup>
    </Flex >
  </>
}