import { InputField, PageGenerator, StandardGrid } from "components"
import { converters } from "databases"
import { getLocaledTitles } from "modules"
import { useEffect, useState } from "react"

export default function Number() {
  const titles = getLocaledTitles()

  const [number, setNumber] = useState("123456")
  const [sourceBase, setSourceBase] = useState(10)
  const [targetBase, setTargetBase] = useState(2)
  const [result, setResult] = useState("")

  useEffect(() => {
    try {
      setResult(parseInt(number, sourceBase).toString(targetBase))
    } catch {
      setResult("")
    }
  }, [number, sourceBase, targetBase])

  return (
    <PageGenerator database={converters} name="number">
      <StandardGrid>
        <InputField
          type="text"
          title={titles.number}
          value={number}
          onChange={setNumber}
        />
        <InputField
          type="number"
          title={titles.sourceBase}
          min={2}
          max={36}
          value={sourceBase.toString()}
          onChange={setSourceBase}
        />
        <InputField
          type="number"
          title={titles.targetBase}
          min={2}
          max={36}
          value={targetBase.toString()}
          onChange={setTargetBase}
        />
      </StandardGrid>
      <InputField
        type="text"
        title={titles.result}
        readOnly
        copyButton
        value={result}
      />
    </PageGenerator>
  )
}
