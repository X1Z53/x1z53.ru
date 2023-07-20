import { InputField, ToggleButtonGroup } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { converters } from "databases"
import { getDatabaseObject } from "features/utils"
import { useEffect, useState } from "react"

export default function Base64() {
  const buttons = ["Текст в Base64", "Base64 в Текст"]
  const [method, setMethod] = useState(buttons[0])
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    try { setResult(buttons.indexOf(method) ? atob(text) : btoa(text)) }
    catch { setResult("") }
  }, [text, method])

  const converter = getDatabaseObject(converters, "base64")

  return <PageCreator {...converter}>
    <StandardGrid>
      <InputField type="text" title="Текст" value={text} callback={setText} />
      <ToggleButtonGroup buttons={buttons} callback={setMethod} />
    </StandardGrid>
    <InputField type="text" title="Результат" readOnly copyButton value={result} />
  </PageCreator>
}
