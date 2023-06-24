import { Flex, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import Copy from "../../../components/buttons/Copy"
import Atbash from "../../../components/ciphers/Atbash"

export default function AtbasePage() {
  const [text, setText] = useState("Hello, World!")
  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz")
  const result = Atbash(text, alphabet)

  return <>
    <Heading>Шифр Атбаш</Heading>
    <Text paddingBottom="4">
      Шифр Атбаш - это особый тип моноалфавитного шифра, сформированного путем переворачивания алфавита,
      так что первая буква становится последней
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