import { InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { converters } from "databases"
import { getDatabaseObject } from "features/utils"
import { useEffect, useState } from "react"

export default function Number() {
  const [number, setNumber] = useState("123456")
  const [sourceBase, setSourceBase] = useState(10)
  const [targetBase, setTargetBase] = useState(2)
  const [result, setResult] = useState("")

  useEffect(() => {
    setResult(parseInt(number, sourceBase).toString(targetBase))
  }, [number, sourceBase, targetBase])

  const converter = getDatabaseObject(converters, "number")

  return <PageCreator {...converter}>
    <StandardGrid>
      <InputField type="text" title="Число" value={number} callback={setNumber} />
      <InputField type="number" title="Исходная система" minValue={2} maxValue={36} value={sourceBase.toString()} callback={setSourceBase} />
      <InputField type="number" title="Конечная система" minValue={2} maxValue={36} value={targetBase.toString()} callback={setTargetBase} />
    </StandardGrid>
    <InputField type="text" title="Результат" readOnly copyButton value={result} />
  </PageCreator>
}
