import { InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { converters } from "databases"
import { bases, coefficients } from "databases/converters/length"
import { getDatabaseObject } from "features/utils"
import { useState } from "react"

export default function Length() {
  const [weight, setWeight] = useState("1")
  const [sourceBase, setSourceBase] = useState("inch")
  const [targetBase, setTargetBase] = useState("centimeter")
  const result = String(Number(weight) * coefficients.find(({ name }) => name === sourceBase)[targetBase])

  const converter = getDatabaseObject(converters, "length")

  return <PageCreator {...converter}>
    <StandardGrid>
      <InputField type="select" title="Начальная система" value={sourceBase} callback={setSourceBase} options={bases} />
      <InputField type="select" title="Концечная система" value={targetBase} callback={setTargetBase} options={bases} />
      <InputField type="text" title="Вес" value={weight} callback={setWeight} />
      <InputField type="text" title="Результат" value={result} readOnly copyButton />
    </StandardGrid>
  </PageCreator>
}