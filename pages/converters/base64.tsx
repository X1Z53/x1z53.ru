import { InputField, PageGenerator, StandardGrid, ToggleButtonGroup } from "components"
import { converters } from "databases"
import { getDatabaseObject, getLocaled } from "modules"
import { useEffect, useState } from "react"

export default function Base64() {
  const { textTitle, resultTitle, buttons } = getLocaled({
    ru: { textTitle: "Текст", resultTitle: "Результат", buttons: ["Текст в Base64", "Base64 в Текст"] },
    en: { textTitle: "Text", resultTitle: "Result", buttons: ["Text to Base64", "Base64 to Text"] }
  })
  const [method, setMethod] = useState(buttons[0])
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    try { setResult(buttons.indexOf(method) ? atob(text) : btoa(text)) }
    catch { setResult("") }
  }, [text, method])

  return <PageGenerator {...getDatabaseObject(getLocaled(converters), "base64")}>
    <StandardGrid>
      <InputField type="text" title={textTitle} value={text} onChange={setText} />
      <ToggleButtonGroup {...{ buttons }} onChange={setMethod} />
    </StandardGrid>
    <InputField type="text" title={resultTitle} readOnly copyButton value={result} />
  </PageGenerator>
}
