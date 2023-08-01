import { Heading, Text } from "@chakra-ui/react"
import { InputField, PageGenerator, StandardGrid } from "components"
import { fileReaders } from "databases"
import Docxtemplater from "docxtemplater"
import { getDatabaseObject, getLocaled } from "modules"
import PizZip from "pizzip"
import { useState } from "react"

export default function File() {
  const { fileTitle, valueTitle } = getLocaled({
    ru: { fileTitle: "Файл", valueTitle: "Выберите или перетащите файлы сюда" },
    en: { fileTitle: "File", valueTitle: "Choose or drag and drop files here" }
  })

  const [fileNames, setFileNames] = useState([])
  const [texts, setTexts] = useState([])

  return <PageGenerator {...getDatabaseObject(getLocaled(fileReaders), "document")}>
    <StandardGrid columns={1}>
      <InputField
        {...{ fileNames, setFileNames }}
        title={fileTitle}
        type="dropzone"
        value={valueTitle}
        clearButton
        readAs="binary"
        onLoad={(event) => {
          const document = new Docxtemplater(new PizZip(event.target.result), { delimiters: { start: "12op1j2po1j2poj1po", end: "op21j4po21jp4oj1op24j" } })
          setTexts(current => [...current, document.getFullText()])
        }}
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