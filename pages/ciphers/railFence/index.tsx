import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import AdaptiveInputField from "../../../components/AdaptiveInputField"
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
      <AdaptiveInputField title="Текст" type="text" value={text} callback={setText} />
      <AdaptiveInputField title="Ключ" type="number" value={key} callback={setKey} minValue={2}/>
      <ToggleButtonGroup buttons={methods} callback={setMethod} />
    </SimpleGrid>
    <Flex justify="center">
      <AdaptiveInputField title="Результат" type="text" readOnly copyButton value={result} styles={{width: "50%"}}/>
    </Flex>
  </>
}