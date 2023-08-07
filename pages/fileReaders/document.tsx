import { Heading, Text } from "@chakra-ui/react"
import { InputField, PageGenerator } from "components"
import { fileReaders } from "databases"
import Docxtemplater from "docxtemplater"
import { getLocaledTitles } from "modules"
import PizZip from "pizzip"
import { useState } from "react"

export default function File() {
  const titles = getLocaledTitles()

  const [fileNames, setFileNames] = useState([])
  const [texts, setTexts] = useState([])

  return (
    <PageGenerator database={fileReaders} name="document">
      <InputField
        {...{ fileNames, setFileNames }}
        title={titles.file}
        type="dropzone"
        value={titles.chooseFile}
        clearButton
        readAs="binary"
        onLoad={(event) => {
          const document = new Docxtemplater(new PizZip(event.target.result), {
            delimiters: {
              start: "12op1j2po1j2poj1po",
              end: "op21j4po21jp4oj1op24j",
            },
          })
          setTexts((current) => [...current, document.getFullText()])
        }}
        useClear={() => {
          setTexts([])
          setFileNames([])
        }}
      />
      {texts.map((text, index) => (
        <>
          <Heading>{fileNames[index]}</Heading>
          {text.split("\n").map((string, index) => (
            <Text key={index}>{string}</Text>
          ))}
        </>
      ))}
    </PageGenerator>
  )
}
