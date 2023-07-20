import { CheckBox, InputField, ToggleButtonGroup } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { converters } from "databases"
import { useToggle } from "features/hooks"
import { getDatabaseObject } from "features/utils"
import { useEffect, useState } from "react"

export default function Binary() {
  const buttons = ["Текст в Биты", "Биты в Текст"]
  const [method, setMethod] = useState(buttons[0])
  const [addUpToEightChars, toggleAddUpToEightChars] = useToggle(true)
  const [addSpacesBetween, toggleAddSpacesBetween] = useToggle(true)
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    setResult(
      buttons.indexOf(method)
        ? text.split(" ").map(char => String.fromCharCode(parseInt(char, 2))).join("")
        : text.split("").map(char => char.charCodeAt(0).toString(2).padStart(8 * Number(addUpToEightChars), "0")).join(addSpacesBetween ? " " : "")
    )
  }, [text, method, addSpacesBetween, addUpToEightChars])

  const converter = getDatabaseObject(converters, "binary")

  return <PageCreator {...converter}>
    <StandardGrid>
      <InputField type="text" title="Число" value={text} onChange={setText} />
      <ToggleButtonGroup {...{buttons}} onChange={setMethod} />
      {
        !buttons.indexOf(method) && <>
          <CheckBox title="Дополонять до 8 цифр" value={addUpToEightChars} onChange={toggleAddUpToEightChars} />
          <CheckBox title="Использовать пробелы" value={addSpacesBetween} onChange={toggleAddSpacesBetween} />
        </>
      }
    </StandardGrid>
    <InputField type="text" title="Результат" readOnly copyButton value={result} />
  </PageCreator>
}