import { Box } from "@chakra-ui/react"
import { CheckBox, InputField, PageCreator, StandardGrid } from "components"
import { textTools } from "databases"
import { getDatabaseObject, sort, useToggle } from "features"
import { useEffect, useState } from "react"

export default function Sort() {
  const chars = [
    { name: "," },
    { name: "\n", title: "Перенос строки" },
    { name: " ", title: "Пробел" },
    { name: "", title: "Без разделителя" },
    { name: "-" },
    { name: ";" },
  ]
  const [splitChar, setSplitChar] = useState(", ")
  const [joinChar, setJoinChar] = useState("\n")
  const [useReverse, toggleUseReverse] = useToggle(false)
  const [useCaseSensitive, toggleUseCaseSensitive] = useToggle(false)
  const [useNatural, toggleUseNatural] = useToggle(false)
  const [useSpaceBeforeJoin, toggleUseSpaceBeforaJoin] = useToggle(true)
  const [useSpaceAfterJoin, toggleUseSpaceAfterJoin] = useToggle(false)

  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    const parts = text.split(splitChar).map(part => part.trim()).sort()

    if (useNatural) parts.sort((a, b) => sort(a, b, useCaseSensitive))
    if (!useNatural && useCaseSensitive) parts.sort((a, b) => a.localeCompare(b))
    if (!useNatural && !useCaseSensitive) parts.sort()

    if (useReverse) parts.reverse()

    setResult(parts.join((useSpaceBeforeJoin ? " " : "") + joinChar + (useSpaceAfterJoin ? " " : "")))
  }, [text, splitChar, useNatural, useReverse, useCaseSensitive, joinChar, useSpaceBeforeJoin, useSpaceAfterJoin])

  return <PageCreator {...getDatabaseObject(textTools, "sort")}>
    <StandardGrid>
      <InputField title="Символ разделения" type="select" options={chars} value={splitChar} onChange={setSplitChar} />
      <InputField title="Символ соединения" type="select" options={chars} value={joinChar} onChange={setJoinChar} />
      <CheckBox title="Обратная сортировка" value={useReverse} onChange={toggleUseReverse} />
      <CheckBox title="Учёт регистра" value={useCaseSensitive} onChange={toggleUseCaseSensitive} />
      <CheckBox title="Естественная сортировка" value={useNatural} onChange={toggleUseNatural} />
      <CheckBox title="Пробел до соединителя" value={useSpaceBeforeJoin} onChange={toggleUseSpaceBeforaJoin} />
      <CheckBox title="Пробел после соединителя" value={useSpaceAfterJoin} onChange={toggleUseSpaceAfterJoin} />
      <Box />
      <InputField title="Текст" type="text" value={text} onChange={setText} />
      <InputField title="Результат" type="text" value={result} readOnly copyButton />
    </StandardGrid>
  </PageCreator>
}