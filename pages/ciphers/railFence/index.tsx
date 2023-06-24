import { Flex, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import Copy from "../../../components/buttons/Copy"
import ToggleButtonGroup from "../../../components/buttons/ToggleButtonGroup"
import RailFence from "../../../components/ciphers/RailFence"

export default function CaesarPage() {
  const methods = ["Encrypt", "Decrypt"]
  const [method, setMethod] = useState(methods[0])
  const [text, setText] = useState("Hello, World!")
  const [key, setKey] = useState("3")
  const result = RailFence(text, key, method)

  return <>
    <Heading>Шифр ограждения рельса (зигзагообразный шифр)</Heading>
    <Text paddingBottom="4">
      В шифре ограждения рельса исходый текст записывается по диагонали вниз и вверх на последовательных &quot;рельсах&quot;,
      пока не будет записан весь текст. Затем зашифрованный текст считывается по строкам.
    </Text>
    <SimpleGrid columns={2} spacing="4" marginBottom="4">
      <InputGroup>
        <InputLeftAddon>Текст</InputLeftAddon>
        <Input value={text} onChange={event => setText(event.target.value)} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Ключ</InputLeftAddon>
        <Input value={key}
          onChange={event => setKey(event.target.value.split("").filter(i => "1234567890".includes(i)).join(""))}
        />
      </InputGroup>
      <ToggleButtonGroup buttons={methods} callback={setMethod}/>
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