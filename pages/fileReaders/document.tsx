import { Heading, Text } from "@chakra-ui/react"
import { InputField, PageCreator } from "components"
import { fileReaders } from "databases"
import Docxtemplater from "docxtemplater"
import { getDatabaseObject } from "features"
import PizZip from "pizzip"
import { useState } from "react"

export default function File() {
  const [fileNames, setFileNames] = useState([])
  const [texts, setTexts] = useState([])

  return <PageCreator {...getDatabaseObject(fileReaders, "document")}>
    <InputField
      {...{ fileNames, setFileNames }}
      title="Файл"
      type="dropzone"
      value="Выберите файл"
      clearButton
      readAs="binary"
      onLoad={(event) => {
        const document = new Docxtemplater(new PizZip(event.target.result))
        setTexts(current => [...current, document.getFullText()])
      }}  
      accept={{"application/vnd.openxmlformats-officedocument.wordprocessingml.document": []}}
      useClear={() => {
        setTexts([])
        setFileNames([])
      }}
    />
    {texts.map((text, index) => <>
      <Heading>{fileNames[index]}</Heading>
      {text.split("\n").map((string, index) => <Text key={index}>{string}</Text>)}
    </>)}
  </PageCreator>
}