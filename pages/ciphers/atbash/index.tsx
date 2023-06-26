import { Flex, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import Copy from "../../../components/buttons/Copy"
import Atbash from "../../../components/ciphers/Atbash"
import AdaptiveInputField from "../../../components/AdaptiveInputField"

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
      <AdaptiveInputField type="text" title="Текст" value={text} callback={setText} />
      <AdaptiveInputField type="text" title="Алфавит" value={alphabet} callback={setAlphabet} />
    </SimpleGrid>
    <Flex justify="center">
      <AdaptiveInputField copyButton readOnly type="text" title="Результат" styles={{width: "50%"}} value={result} />
    </Flex >
  </>
}