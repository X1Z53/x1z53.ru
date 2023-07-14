import { Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { CheckBox, InputField, ToggleButtonGroup } from "components/form"
import { getDatabase, useToggle } from "features/hooks"
import { useEffect, useState } from "react"

export default function Binary() {
  const { data, isLoading } = getDatabase("converters")
  const buttons = ["Текст в Биты", "Биты в Текст"]
  const [method, setMethod] = useState(buttons[0])
  const [addUpToEightChars, toggleAddUpToEightChars] = useToggle(true)
  const [addSpacesBetween, toggleAddSpacesBetween] = useToggle(true)
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    setResult(
      buttons.indexOf(method)
        ? text.split(" ").map(char => String.fromCharCode(parseInt(char, 2))).join("")
        : text.split("").map(char => char.charCodeAt(0).toString(2).padStart(8 * Number(addUpToEightChars), "0")).join(addSpacesBetween ? " " : "")
    )
  }, [text, method, addSpacesBetween, addUpToEightChars])

  if (isLoading) return <Spinner />
  const { title, description } = data.find(({ name }) => name === "binary")

  return <>
    <Heading>{title}</Heading>
    <Text paddingBottom="4">{description}</Text>
    <SimpleGrid columns={[1, 2]} spacing={4} marginBottom={4} alignItems="center">
      <InputField type="text" title="Число" value={text} callback={setText} />
      <ToggleButtonGroup buttons={buttons} callback={setMethod} />
      {
        !buttons.indexOf(method) && <>
          <CheckBox title="Дополонять до 8 цифр" value={addUpToEightChars} callback={toggleAddUpToEightChars} />
          <CheckBox title="Использовать пробелы" value={addSpacesBetween} callback={toggleAddSpacesBetween} />
        </>
      }
    </SimpleGrid>
    <InputField type="text" title="Результат" readOnly copyButton value={result} />
  </>
}