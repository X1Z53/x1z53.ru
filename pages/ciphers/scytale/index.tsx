import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import AdaptiveInputField from "../../../components/AdaptiveInputField"
import ToggleButtonGroup from "../../../components/buttons/ToggleButtonGroup"
import Scytale from "../../../components/ciphers/Scytale"

export default function CaesarPage() {
  const methods = ["Encrypt", "Decrypt"]
  const [method, setMethod] = useState(methods[0])
  const [text, setText] = useState("Hello, World!")
  const [key, setKey] = useState("3")
  const result = Scytale(text, Number(key), method)

  return <>
    <Heading>Шифр Скиталы</Heading>
    <Text paddingBottom="4">
      .
    </Text>
    <SimpleGrid columns={2} spacing="4" marginBottom="4">
      <AdaptiveInputField title="Текст" type="text" value={text} callback={setText} />
      <AdaptiveInputField title="Ключ" type="number" value={key} callback={setKey} minValue={2}/>
      <ToggleButtonGroup buttons={methods} callback={setMethod} />
    </SimpleGrid>
    <Flex justify="center">
      <AdaptiveInputField styles={{width: "50%"}} title="Результат" copyButton readOnly type="text" value={result} />
    </Flex >
  </>
}