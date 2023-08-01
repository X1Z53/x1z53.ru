import { InputField, PageGenerator, StandardGrid, ToggleButtonGroup } from "components"
import { converters } from "databases"
import { getLocaled, getLocaledTitles } from "modules"
import { useEffect, useState } from "react"

export default function Base64() {
  const { buttons } = getLocaled({
    ru: { buttons: ["Текст в Base64", "Base64 в Текст"] },
    en: { buttons: ["Text to Base64", "Base64 to Text"] }
  })
  const titles = getLocaledTitles()

  const [method, setMethod] = useState(buttons[0])
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    try { setResult(buttons.indexOf(method) ? atob(text) : btoa(text)) }
    catch { setResult("") }
  }, [text, method])

  return <PageGenerator database={converters} name="base64">
    <StandardGrid>
      <InputField type="text" title={titles.text} value={text} onChange={setText} />
      <ToggleButtonGroup {...{ buttons }} onChange={setMethod} />
    </StandardGrid>
    <InputField type="text" title={titles.result} readOnly copyButton value={result} />
  </PageGenerator>
}
