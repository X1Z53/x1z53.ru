import { Box } from "@chakra-ui/react"
import { CheckBox, InputField, PageGenerator, StandardGrid } from "components"
import { textTools } from "databases"
import { getDatabaseObject, getLocaled, sort, useToggle } from "modules"
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

  const {
    splitCharTitle, joinCharTitle, reverseTitle, caseSensitiveTitle, naturalTitle,
    spaceBeforeJoinTitle, spaceAfterJoinTitle, textTitle, resultTitle
  } = getLocaled({
    ru: {
      splitCharTitle: "Символ разделения",
      joinCharTitle: "Символ соединения",
      reverseTitle: "Обратная сортировка",
      caseSensitiveTitle: "Учёт регистра",
      naturalTitle: "Естественная сортировка",
      spaceBeforeJoinTitle: "Пробел до соединителя",
      spaceAfterJoinTitle: "Пробел после соединителя",
      textTitle: "Текст",
      resultTitle: "Результат"
    },
    en: {
      splitCharTitle: "Split char",
      joinCharTitle: "Join char",
      reverseTitle: "Reverse",
      caseSensitiveTitle: "Case sensitive",
      naturalTitle: "Natural sort",
      spaceBeforeJoinTitle: "Space before join",
      spaceAfterJoinTitle: "Space after join",
      textTitle: "Text",
      resultTitle: "Result"
    }
  })

  return <PageGenerator {...getDatabaseObject(getLocaled(textTools), "sort")}>
    <StandardGrid>
      <InputField title={splitCharTitle} type="select" options={chars} value={splitChar} onChange={setSplitChar} />
      <InputField title={joinCharTitle} type="select" options={chars} value={joinChar} onChange={setJoinChar} />
      <CheckBox title={reverseTitle} value={useReverse} onChange={toggleUseReverse} />
      <CheckBox title={caseSensitiveTitle} value={useCaseSensitive} onChange={toggleUseCaseSensitive} />
      <CheckBox title={naturalTitle} value={useNatural} onChange={toggleUseNatural} />
      <CheckBox title={spaceBeforeJoinTitle} value={useSpaceBeforeJoin} onChange={toggleUseSpaceBeforaJoin} />
      <CheckBox title={spaceAfterJoinTitle} value={useSpaceAfterJoin} onChange={toggleUseSpaceAfterJoin} />
      <Box />
      <InputField title={textTitle} type="text" value={text} onChange={setText} />
      <InputField title={resultTitle} type="text" value={result} readOnly copyButton />
    </StandardGrid>
  </PageGenerator>
}