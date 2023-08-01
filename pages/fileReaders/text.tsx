import { Heading, Text } from "@chakra-ui/react"
import { InputField, PageGenerator } from "components"
import { fileReaders } from "databases"
import { getLocaledTitles } from "modules"
import { useState } from "react"

export default function FileReaderComponent() {
  const titles = getLocaledTitles()

  const [texts, setTexts] = useState([])
  const [fileNames, setFileNames] = useState([])

  return <PageGenerator database={fileReaders} name="text">
    <InputField
      {...{ fileNames, setFileNames }}
      title={titles.file}
      type="dropzone"
      value={titles.chooseFile}
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
  </PageGenerator>
}
