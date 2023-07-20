import { InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { converters } from "databases"
import { bases, coefficients } from "databases/converters/weight"
import { getDatabaseObject } from "features/utils"
import { useState } from "react"

export default function Weight() {
  const [weight, setWeight] = useState("1")
  const [sourceBase, setSourceBase] = useState("kilogram")
  const [targetBase, setTargetBase] = useState("pound")
  const result = String(Number(weight) * coefficients.find(({ name }) => name === sourceBase)[targetBase])

  const converter = getDatabaseObject(converters, "weight")

  return <PageCreator {...converter}>
    <StandardGrid>
      <InputField type="select" title="Начальная система" value={sourceBase} onChange={setSourceBase} options={bases} />
      <InputField type="select" title="Концечная система" value={targetBase} onChange={setTargetBase} options={bases} />
      <InputField type="text" title="Вес" value={weight} onChange={setWeight} />
      <InputField type="text" title="Результат" value={result} readOnly copyButton />
    </StandardGrid>
  </PageCreator>
}