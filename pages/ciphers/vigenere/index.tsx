import { Flex, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import Copy from "../../../components/buttons/Copy"
import ToggleButtonGroup from "../../../components/buttons/ToggleButtonGroup"
import Vigenere from "../../../components/ciphers/Vigenere"

export default function VigenerePage() {
  const methods = ["Encrypt", "Decrypt"]
  const [method, setMethod] = useState(methods[0])
  const [text, setText] = useState("Hello, World!")
  const [key, setKey] = useState("key")
  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz")
  const result = Vigenere(text, key, alphabet, method)

  return <>
    <Heading>Шифр Виженера</Heading>
    <Text paddingBottom="4">
      Шифр Виженера - это метод шифрования алфавитного текста, при котором каждая буква кодируется шифром Цезаря.
      В качестве ключа шифра Цезаря используются символы из ключа шифра Виженера.
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
          onChange={event => setKey(event.target.value.split("").filter(i => alphabet.includes(i)).join(""))}
        />
      </InputGroup>
      <ToggleButtonGroup buttons={methods} callback={setMethod} />
    </SimpleGrid>
    <Flex justify="center">
      <InputGroup width="50%">
        <InputLeftAddon>Результат</InputLeftAddon>
        <Input readOnly value={result} />
        <InputRightAddon padding="0" >
          <Copy value={result} styles={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }} />
        </InputRightAddon>
      </InputGroup>
    </Flex >
  </>
}