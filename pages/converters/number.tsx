import { InputField, PageCreator, StandardGrid } from "components"
import { converters } from "databases"
import { getDatabaseObject } from "features"
import { useEffect, useState } from "react"

export default function Number() {
  const [number, setNumber] = useState("123456")
  const [sourceBase, setSourceBase] = useState(10)
  const [targetBase, setTargetBase] = useState(2)
  const [result, setResult] = useState("")

  useEffect(() => {
    try { setResult(parseInt(number, sourceBase).toString(targetBase)) }
    catch { setResult("") }
  }, [number, sourceBase, targetBase])

  const converter = getDatabaseObject(converters, "number")

  return <PageCreator {...converter}>
    <StandardGrid>
      <InputField type="text" title="Число" value={number} onChange={setNumber} />
      <InputField type="number" title="Исходная система" min={2} max={36} value={sourceBase.toString()} onChange={setSourceBase} />
      <InputField type="number" title="Конечная система" min={2} max={36} value={targetBase.toString()} onChange={setTargetBase} />
    </StandardGrid>
    <InputField type="text" title="Результат" readOnly copyButton value={result} />
  </PageCreator>
}
