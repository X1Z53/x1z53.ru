import { CheckBox, InputField, PageGenerator, StandardGrid, ToggleButtonGroup } from "components"
import { converters } from "databases"
import { getLocaled, getLocaledTitles, useToggle } from "modules"
import { useEffect, useState } from "react"

export default function Binary() {
  const { buttons } = getLocaled({
    ru: { buttons: ["Текст в Биты", "Биты в Текст"] },
    en: { buttons: ["Text to Bites", "Bites to Text"] }
  })
  const titles = getLocaledTitles()

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

  return <PageGenerator database={converters} name="binary">
    <StandardGrid>
      <InputField type="text" title={titles.text} value={text} onChange={setText} />
      <ToggleButtonGroup {...{buttons}} onChange={setMethod} />
      {
        !buttons.indexOf(method) && <>
          <CheckBox title={titles.complementUpToEightChars} value={complementUpToEightChars} onChange={toggleComplementUpToEightChars} />
          <CheckBox title={titles.addSpaces} value={addSpacesBetween} onChange={toggleAddSpacesBetween} />
        </>
      }
    </StandardGrid>
    <InputField type="text" title={titles.result} readOnly copyButton value={result} />
  </PageGenerator>
}