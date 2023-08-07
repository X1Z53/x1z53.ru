import { Box } from "@chakra-ui/react"
import { CheckBox, InputField, PageGenerator, StandardGrid } from "components"
import { textTools } from "databases"
import { getLocaledTitles, sort, useToggle } from "modules"
import { useEffect, useState } from "react"

export default function Sort() {
  const titles = getLocaledTitles()
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
    const parts = text
      .split(splitChar)
      .map((part) => part.trim())
      .sort()

    if (useNatural) parts.sort((a, b) => sort(a, b, useCaseSensitive))
    if (!useNatural && useCaseSensitive)
      parts.sort((a, b) => a.localeCompare(b))
    if (!useNatural && !useCaseSensitive) parts.sort()

    if (useReverse) parts.reverse()

    setResult(
      parts.join(
        (useSpaceBeforeJoin ? " " : "") +
          joinChar +
          (useSpaceAfterJoin ? " " : ""),
      ),
    )
  }, [
    text,
    splitChar,
    useNatural,
    useReverse,
    useCaseSensitive,
    joinChar,
    useSpaceBeforeJoin,
    useSpaceAfterJoin,
  ])

  return (
    <PageGenerator database={textTools} name="sort">
      <StandardGrid>
        <InputField
          title={titles.splitChar}
          type="select"
          options={chars}
          value={splitChar}
          onChange={setSplitChar}
        />
        <InputField
          title={titles.joinChar}
          type="select"
          options={chars}
          value={joinChar}
          onChange={setJoinChar}
        />
        <CheckBox
          title={titles.reverseSort}
          value={useReverse}
          onChange={toggleUseReverse}
        />
        <CheckBox
          title={titles.caseSensitive}
          value={useCaseSensitive}
          onChange={toggleUseCaseSensitive}
        />
        <CheckBox
          title={titles.naturalSort}
          value={useNatural}
          onChange={toggleUseNatural}
        />
        <CheckBox
          title={titles.spaceBeforeJoin}
          value={useSpaceBeforeJoin}
          onChange={toggleUseSpaceBeforaJoin}
        />
        <CheckBox
          title={titles.spaceAfterJoin}
          value={useSpaceAfterJoin}
          onChange={toggleUseSpaceAfterJoin}
        />
        <Box />
        <InputField
          title={titles.text}
          type="text"
          value={text}
          onChange={setText}
        />
        <InputField
          title={titles.result}
          type="text"
          value={result}
          readOnly
          copyButton
        />
      </StandardGrid>
    </PageGenerator>
  )
}
