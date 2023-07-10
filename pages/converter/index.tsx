import { Box, SimpleGrid } from "@chakra-ui/react"
import { AdaptiveInputField } from "components"
import { useEffect, useState } from "react"

function NumberConverter() {
  const [number, setNumber] = useState("123456")
  const [sourceBase, setSourceBase] = useState(10)
  const [targetBase, setTargetBase] = useState(2)
  const [result, setResult] = useState("")

  useEffect(() => {
    setResult(parseInt(number, sourceBase).toString(targetBase))
  }, [number, sourceBase, targetBase])

  return <Box>
    <SimpleGrid columns={[1, 3]} spacing={4} marginBottom={4}>
      <AdaptiveInputField title="Number" type="text" value={number} callback={setNumber} />
      <AdaptiveInputField title="Source Base" type="number" minValue={2} maxValue={36} value={sourceBase} callback={setSourceBase} />
      <AdaptiveInputField title="Target Base" type="number" minValue={2} maxValue={36} value={targetBase} callback={setTargetBase} />
    </SimpleGrid>
    <AdaptiveInputField title="Converted Number" type="text" readOnly copyButton value={result} />
  </Box>
}

export default NumberConverter
