import { InputField, PageGenerator, StandardGrid } from "components"
import { converters } from "databases"
import { getDatabaseObject, getLocaled } from "modules"
import { useEffect, useState } from "react"

export default function Number() {
  const { numberTitle, resultTitle, sourceBaseTitle, targetBaseTitle } = getLocaled({
    ru: { numberTitle: "Число", resultTitle: "Результат", sourceBaseTitle: "Исходная система", targetBaseTitle: "Конечная система" },
    en: { numberTitle: "Number", resultTitle: "Result", sourceBaseTitle: "Source base", targetBaseTitle: "Target base" }
  })
  const [number, setNumber] = useState("123456")
  const [sourceBase, setSourceBase] = useState(10)
  const [targetBase, setTargetBase] = useState(2)
  const [result, setResult] = useState("")

  useEffect(() => {
    try { setResult(parseInt(number, sourceBase).toString(targetBase)) }
    catch { setResult("") }
  }, [number, sourceBase, targetBase])

  return <PageGenerator {...getDatabaseObject(getLocaled(converters), "number")}>
    <StandardGrid>
      <InputField type="text" title={numberTitle} value={number} onChange={setNumber} />
      <InputField type="number" title={sourceBaseTitle} min={2} max={36} value={sourceBase.toString()} onChange={setSourceBase} />
      <InputField type="number" title={targetBaseTitle} min={2} max={36} value={targetBase.toString()} onChange={setTargetBase} />
    </StandardGrid>
    <InputField type="text" title={resultTitle} readOnly copyButton value={result} />
  </PageGenerator>
}
