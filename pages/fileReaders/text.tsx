import { Heading, Text } from "@chakra-ui/react"
import { InputField, PageGenerator, StandardGrid } from "components"
import { fileReaders } from "databases"
import { getDatabaseObject, getLocaled } from "modules"
import { useState } from "react"

export default function FileReaderComponent() {
  const { fileTitle, valueTitle } = getLocaled({
    ru: { fileTitle: "Файл", valueTitle: "Выберите или перетащите файлы сюда" },
    en: { fileTitle: "File", valueTitle: "Choose or drag and drop files here" }
  })

  const [texts, setTexts] = useState([])
  const [fileNames, setFileNames] = useState([])

  return <PageGenerator {...getDatabaseObject(getLocaled(fileReaders), "text")}>
    <StandardGrid columns={1}>
      <InputField
        {...{ fileNames, setFileNames }}
        title={fileTitle}
        type="dropzone"
        value={valueTitle}
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
  </PageGenerator>
}
