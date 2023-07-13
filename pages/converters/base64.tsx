import { Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { InputField, ToggleButtonGroup } from "components/form"
import { getDatabase } from "modules/hooks"
import { useEffect, useState } from "react"

export default function Base64Converter() {
  const convertersParams = getDatabase("converters") || { title: "", description: "" }
  const { title, description } = convertersParams
  const buttons = ["Текст в Base64", "Base64 в Текст"]
  const [method, setMethod] = useState(buttons[0])
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    try { setResult(buttons.indexOf(method) ? atob(text) : btoa(text)) }
    catch { setResult("") }
  }, [text, method])

  return <>
    <Heading>{title}</Heading>
    <Text paddingBottom="4">{description}</Text>
    <SimpleGrid columns={2} spacing={4} marginBottom={4} alignItems="center">
      <InputField type="text" title="Текст" value={text} callback={setText} />
      <ToggleButtonGroup buttons={buttons} callback={setMethod} />
    </SimpleGrid>
    <InputField type="text" title="Результат" readOnly copyButton value={result} />
  </>
}
