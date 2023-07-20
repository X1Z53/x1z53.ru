import { Box } from "@chakra-ui/react"
import { CheckBox, InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { textTools } from "databases"
import { useToggle } from "features/hooks"
import { getDatabaseObject, naturalSort } from "features/utils"
import { useEffect, useState } from "react"

export default function Sort() {
  const inputFieldHeight = "150px"

  const [splitChar, setSplitChar] = useState(",")
  const [joinChar, setJoinChar] = useState("\n")
  const [useReverse, toggleUseReverse] = useToggle(false)
  const [useCaseSensitive, toggleUseCaseSensitive] = useToggle(false)
  const [useNatural, toggleUseNatural] = useToggle(false)

  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    const parts = text.split(splitChar).map(part => part.trim()).sort()

    if (!useCaseSensitive) parts.sort((a, b) => a.localeCompare(b))
    if (useNatural) parts.sort((a, b) => naturalSort(a, b, useCaseSensitive))
    if (useReverse) parts.reverse()

    setResult(parts.join(joinChar))
  }, [text, splitChar, useNatural, useReverse, useCaseSensitive, joinChar])

  const textTool = getDatabaseObject(textTools, "sort")

  return <PageCreator {...textTool}>
    <StandardGrid>
      <InputField title="Символ разделения" type="text" value={splitChar} onChange={setSplitChar} />
      <InputField title="Символ соединения" type="text" value={joinChar} onChange={setJoinChar} />
      <CheckBox title="Обратная сортировка" value={useReverse} onChange={toggleUseReverse} />
      <CheckBox title="Учёт регистра" value={useCaseSensitive} onChange={toggleUseCaseSensitive} />
      <CheckBox title="Естественная сортировка" value={useNatural} onChange={toggleUseNatural} />
      <Box />
      <InputField title="Текст" type="text" value={text} onChange={setText} minHeight={inputFieldHeight} />
      <InputField title="Результат" type="text" value={result} readOnly copyButton minHeight={inputFieldHeight} />
    </StandardGrid>
  </PageCreator>
}