import { Flex, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { InputField, ToggleButtonGroup } from "components/form"
import * as ciphers from "features/ciphers"
import { getDatabase, getUrl } from "features/hooks"
import { useState } from "react"

export default function Cipher() {
  const buttons = ["Зашифровать", "Расшифровать"]
  const [method, setMethod] = useState(buttons[0])
  const [text, setText] = useState("Hello, World!")
  const [key, setKey] = useState("key")
  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz")

  const { data, isLoading } = getDatabase("ciphers")
  if (isLoading) return <Spinner />

  const { cipher: cipherName } = getUrl()
  const { canBeDecrypted, description, letterKey, name, requiresAlphabet, requiresKey, title } = data.find(({ name }) => name === cipherName)
  const cipher = ciphers[name.at(0)?.toUpperCase() + name.slice(1)]

  const result = cipher({ text, alphabet, key, isDecrypt: buttons.indexOf(method), setKey })

  return <>
    <Heading>{title}</Heading>
    <Text paddingBottom="4">{description}</Text>
    <SimpleGrid columns={[1, 1, 2]} spacing="4" marginBottom="4" alignItems="center">
      {result ? <InputField type="text" title="Текст" value={text} callback={setText} /> : <></>}
      {requiresAlphabet ? <InputField type="text" title="Алфавит" value={alphabet} callback={setAlphabet} /> : <></>}
      {
        requiresKey ? <InputField
          type={letterKey ? "text" : "number"}
          title="Ключ"
          includedInAlphabet={letterKey}
          value={key.toString()}
          alphabet={alphabet}
          minValue={2}
          callback={setKey}
        /> : <></>
      }
      {canBeDecrypted ? <ToggleButtonGroup buttons={buttons} callback={setMethod} /> : <></>}
    </SimpleGrid>
    <Flex justify="center">
      {result ? <InputField type="text" title="Результат" readOnly copyButton value={result} /> : <></>}
    </Flex >
  </>
}