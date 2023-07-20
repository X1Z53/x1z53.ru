import { InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { converters } from "databases"
import { bases, coefficients } from "databases/converters/time"
import { getDatabaseObject } from "features/utils"
import { useState } from "react"

export default function Time() {
  const [time, setTime] = useState("1")
  const [sourceBase, setSourceBase] = useState("year")
  const [targetBase, setTargetBase] = useState("day")
  const result = String(Number(time) * coefficients.find(({ name }) => name === sourceBase)[targetBase])

  const converter = getDatabaseObject(converters, "time")

  return <PageCreator {...converter}>
    <StandardGrid>
      <InputField type="select" title="Начальная система" value={sourceBase} onChange={setSourceBase} options={bases} />
      <InputField type="select" title="Концечная система" value={targetBase} onChange={setTargetBase} options={bases} />
      <InputField type="text" title="Время" value={time} onChange={setTime} />
      <InputField type="text" title="Результат" value={result} readOnly copyButton />
    </StandardGrid>
  </PageCreator>
}