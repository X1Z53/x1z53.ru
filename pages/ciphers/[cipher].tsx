import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { AdaptiveInputField } from "components"
import { ToggleButtonGroup } from "components/buttons"
import * as ciphers from "modules/ciphers"
import { getDatabase, getUrl } from "modules/hooks"
import { useState } from "react"

export default function CipherPage() {
  const { ciphers: ciphersParams } = getDatabase()
  const { cipher: cipherName } = getUrl()
  const cipherParams = ciphersParams.find(({ name }) => name === cipherName)
    || { canBeDecrypted: 0, description: "", letterKey: 1, name: "", requiresAlphabet: 0, requiresKey: 0, title: "" }
  const { canBeDecrypted, description, letterKey, name, requiresAlphabet, requiresKey, title } = cipherParams
  const cipher = ciphers[name.at(0)?.toUpperCase() + name.slice(1)]

  const buttons = ["Зашифровать", "Расшифровать"]
  const [method, setMethod] = useState(buttons[0])
  const [text, setText] = useState("Hello, World!")
  const [key, setKey] = useState(letterKey ? "key" : 3)
  const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz")
  const result = cipher ? cipher({ text, alphabet, key, isDecrypt: buttons.indexOf(method) }) : ""
  if (result === "keyError") {
    setKey(3)
  }

  return <>
    <Heading>{title}</Heading>
    <Text paddingBottom="4">{description}</Text>
    <SimpleGrid columns={2} spacing="4" marginBottom="4">
      {result ? <AdaptiveInputField type="text" title="Текст" value={text} callback={setText} /> : <></>}
      {requiresAlphabet ? <AdaptiveInputField type="text" title="Алфавит" value={alphabet} callback={setAlphabet} /> : <></>}
      {
        requiresKey ? <AdaptiveInputField
          type={letterKey ? "text" : "number"}
          includedInAlphabet={letterKey}
          title={"Ключ"}
          value={key}
          alphabet={alphabet}
          minValue={2}
          callback={setKey}
        /> : <></>
      }
      {canBeDecrypted ? <ToggleButtonGroup buttons={buttons} callback={setMethod} /> : <></>}
    </SimpleGrid>
    <Flex justify="center">
      {result ? <AdaptiveInputField styles={{ width: "50%" }} type="text" readOnly copyButton value={result} title="Результат" /> : <></>}
    </Flex >
  </>
}