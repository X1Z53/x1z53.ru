import { CheckBox, InputField, PageGenerator, StandardGrid, ToggleButtonGroup } from "components"
import { converters } from "databases"
import { getDatabaseObject, getLocaled, useToggle } from "modules"
import { useEffect, useState } from "react"

export default function Binary() {
  const { textTitle, resultTitle, complementUpToEightCharsTitle, addSpacesBetweenTitle, buttons } = getLocaled({
    ru: { textTitle: "Текст", resultTitle: "Результат", complementUpToEightCharsTitle: "Дополнять до 8 цифр", addSpacesBetweenTitle: "Использовать пробелы", buttons: ["Текст в Биты", "Биты в Текст"] },
    en: { textTitle: "Text", resultTitle: "Result", complementUpToEightCharsTitle: "Complement up to 8 digits", addSpacesBetweenTitle: "Use spaces", buttons: ["Text to Bites", "Bites to Text"] }
  })
  const [method, setMethod] = useState(buttons[0])
  const [complementUpToEightChars, toggleComplementUpToEightChars] = useToggle(true)
  const [addSpacesBetween, toggleAddSpacesBetween] = useToggle(true)
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    setResult(
      buttons.indexOf(method)
        ? text.split(" ").map(char => String.fromCharCode(parseInt(char, 2))).join("")
        : text.split("").map(char => char.charCodeAt(0).toString(2).padStart(8 * Number(complementUpToEightChars), "0")).join(addSpacesBetween ? " " : "")
    )
  }, [text, method, addSpacesBetween, complementUpToEightChars])

  return <PageGenerator {...getDatabaseObject(getLocaled(converters), "binary")}>
    <StandardGrid>
      <InputField type="text" title={textTitle} value={text} onChange={setText} />
      <ToggleButtonGroup {...{buttons}} onChange={setMethod} />
      {
        !buttons.indexOf(method) && <>
          <CheckBox title={complementUpToEightCharsTitle} value={complementUpToEightChars} onChange={toggleComplementUpToEightChars} />
          <CheckBox title={addSpacesBetweenTitle} value={addSpacesBetween} onChange={toggleAddSpacesBetween} />
        </>
      }
    </StandardGrid>
    <InputField type="text" title={resultTitle} readOnly copyButton value={result} />
  </PageGenerator>
}