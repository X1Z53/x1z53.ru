import { Box, Heading, StyleProps, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { InputField, PageGenerator, ToggleButtonGroup } from "components"
import { fileReaders } from "databases"
import { getLocaled, getLocaledTitles } from "modules"
import { useState } from "react"
import { read, utils } from "xlsx"

export default function FileReaderComponent() {
  const { columnButtons, rowButtons } = getLocaled({
    ru: {
      columnButtons: ["Стандартный корешок", "Корешок по первой колонке", "Без корешока"],
      rowButtons: ["Стандартный заголовок", "Заголовок по первой строке", "Без заголовка"],
    },
    en: {
      columnButtons: ["Standard stub", "Stub of first column", "Without stub"],
      rowButtons: ["Standard header", "Header of first row", "Without header"],
    }
  })
  const titles = getLocaledTitles()

  const [tables, setTables] = useState([])
  const [heads, setHeads] = useState([])
  const [columnButton, setColumnButton] = useState(columnButtons[0])
  const [rowButton, setRowButton] = useState(rowButtons[0])
  const [fileNames, setFileNames] = useState([])

  const CellStyles: StyleProps = {
    borderWidth: "1px",
    textAlign: "center",
    borderRadius: "6px"
  }
  const HeadStyles: StyleProps = {
    ...CellStyles,
    backgroundColor: "gray.700",
    borderColor: "gray.800",
  }

  return <PageGenerator database={fileReaders} name="table" >
    <InputField
      {...{ fileNames, setFileNames }}
      title={titles.file}
      type="dropzone"
      value={titles.chooseFile}
      clearButton
      onLoad={(event) => {
        const table = event.target.result
        const book = read(table, { type: "binary" })
        const names = book.SheetNames
        const sheet = book.Sheets[names[0]]
        setHeads(current => [...current, Object.keys(utils.sheet_to_json(sheet, { header: "A" })[0])])
        setTables(current => [...current, utils.sheet_to_json(sheet, { header: 1 })])
      }}
      readAs="binary"
      useClear={() => {
        setTables([])
        setHeads([])
        setFileNames([])
      }}
    />
    <ToggleButtonGroup buttons={columnButtons} onChange={setColumnButton} />
    <ToggleButtonGroup buttons={rowButtons} onChange={setRowButton} />
    {
      tables && tables.map((table, index) =>
        <Box overflow="auto" key={index}>
          <Heading>{fileNames[index]}</Heading>
          <Table>
            <Thead>
              <Tr>
                {!rowButtons.indexOf(rowButton) && <>
                  {!columnButtons.indexOf(columnButton) && <Th {...HeadStyles} />}
                  {heads[index].map(cell => <Th key={cell} {...HeadStyles}>{cell}</Th>)}
                </>}
              </Tr>
            </Thead>
            <Tbody>
              {table.map((row, rowIndex) => <Tr key={rowIndex}>
                {!columnButtons.indeOf(columnButton) && <Th {...HeadStyles}>{rowIndex + 1}</Th>}
                {row.map((cell, cellIndex) =>
                  (!rowIndex && rowButtons.indexOf(rowButton) === 1) || (!cellIndex && columnButtons.indexOf(columnButton) === 1)
                    ? <Th {...HeadStyles} key={cellIndex}>{cell}</Th>
                    : <Td {...CellStyles} key={cellIndex}>{cell}</Td>
                )}
              </Tr>)}
            </Tbody>
          </Table>
        </Box>
      )
    }
  </PageGenerator>
}
