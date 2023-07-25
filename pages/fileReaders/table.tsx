import { Box, Heading, StyleProps, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { InputField, StandardGrid, ToggleButtonGroup } from "components"
import { useState } from "react"
import { read, utils } from "xlsx"

export default function FileReaderComponent() {
  const [tables, setTables] = useState([])
  const [heads, setHeads] = useState([])
  const columnButtons = ["Стандартный боковик", "Боковик по первой колонке", "Без боковика"]
  const rowButtons = ["Стандартный заголовок", "Заголовок по первой строке", "Без заголовка"]
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

  return <StandardGrid columns={1}>
    <InputField
      {...{ fileNames, setFileNames }}
      title="Файл"
      type="dropzone"
      value="Выберите или перетащите сюда файлы таблиц"
      clearButton
      onLoad={(event) => {
        console.log("Here")
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
                {rowButton === "Стандартный заголовок" && <>
                  {columnButton === "Стандартный боковик" && <Th {...HeadStyles} />}
                  {heads[index].map(cell => <Th key={cell} {...HeadStyles}>{cell}</Th>)}
                </>}
              </Tr>
            </Thead>
            <Tbody>
              {table.map((row, rowIndex) => <Tr key={rowIndex}>
                {columnButton === "Стандартный боковик" && <Th {...HeadStyles}>{rowIndex + 1}</Th>}
                {row.map((cell, cellIndex) =>
                  (!rowIndex && rowButton === "Заголовок по первой строке") || (!cellIndex && columnButton === "Боковик по первой колонке")
                    ? <Th {...HeadStyles} key={cellIndex}>{cell}</Th>
                    : <Td {...CellStyles} key={cellIndex}>{cell}</Td>
                )}
              </Tr>)}
            </Tbody>
          </Table>
        </Box>
      )
    }
  </StandardGrid>
}
