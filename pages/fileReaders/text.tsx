import { Heading, Text } from "@chakra-ui/react"
import { InputField, StandardGrid } from "components"
import { useState } from "react"

export default function FileReaderComponent() {
  const [texts, setTexts] = useState([])
  const [fileNames, setFileNames] = useState([])

  return <StandardGrid columns={1}>
    <InputField
      {...{ fileNames, setFileNames }}
      title="Файл"
      type="dropzone"
      value="Перетащите файл сюда или кликните, чтобы выбрать файл"
      clearButton
      onLoad={(event) => { setTexts(current => [...current, event.target.result.toString()]) }}
      useClear={() => {
        setTexts([])
        setFileNames([])
      }}
    />
    {texts.map((text, index) => <>
      <Heading>{fileNames[index]}</Heading>
      {text.split("\n").map((string, index) => <Text key={index}>{string}</Text>)}
    </>)}
  </StandardGrid>
}
