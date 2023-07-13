import { Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { InputField } from "components/form"
import { getDatabase } from "modules/hooks"
import { useEffect, useState } from "react"

export default function NumberConverter() {
  const convertersParams = getDatabase("converters") || { title: "", description: "" }
  const { title, description } = convertersParams
  const [number, setNumber] = useState("123456")
  const [sourceBase, setSourceBase] = useState(10)
  const [targetBase, setTargetBase] = useState(2)
  const [result, setResult] = useState("")

  useEffect(() => {
    if (targetBase) setResult(parseInt(number, sourceBase).toString(targetBase))
    else setResult("")
  }, [number, sourceBase, targetBase])

  return <>
    <Heading>{title}</Heading>
    <Text paddingBottom="4">{description}</Text>
    <SimpleGrid columns={[1, 3]} spacing={4} marginBottom={4} alignItems="center">
      <InputField type="text" title="Число" value={number} callback={setNumber} />
      <InputField type="number" title="Исходная система" minValue={2} maxValue={36} value={sourceBase.toString()} callback={setSourceBase} />
      <InputField type="number" title="Конечная система" minValue={2} maxValue={36} value={targetBase.toString()} callback={setTargetBase} />
    </SimpleGrid>
    <InputField type="text" title="Результат" readOnly copyButton value={result} />
  </>
}
