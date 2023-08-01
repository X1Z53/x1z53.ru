import { InputField, PageGenerator, StandardGrid } from "components"
import { converters } from "databases"
import * as databases from "databases/converters"
import { getDatabaseObject, getLocaled } from "modules"
import { useState } from "react"
import { ConverterPageGeneratorProps } from "types"

export default function ConverterPageGenerator({
  name,
  defaultSourcBase, defaultTargetBase
}: ConverterPageGeneratorProps) {
  const { bases: allBases, coefficients } = databases[name]
  const bases = getLocaled(allBases)
  const { textTitle, resultTitle, startBaseTitle, targetBaseTitle } = getLocaled({
    ru: { textTitle: "Значение", resultTitle: "Результат", startBaseTitle: "Начальная система", targetBaseTitle: "Конечная система" },
    en: { textTitle: "Value", resultTitle: "Result", startBaseTitle: "Source base", targetBaseTitle: "Target base" }
  })
  const [value, setValue] = useState("1")
  const [sourceBase, setSourceBase] = useState(defaultSourcBase)
  const [targetBase, setTargetBase] = useState(defaultTargetBase)
  const result = String(Number(value) * coefficients.find(({ name }) => name === sourceBase)[targetBase])

  return <PageGenerator {...getDatabaseObject(getLocaled(converters), name)}>
    <StandardGrid>
      <InputField type="select" title={startBaseTitle} value={sourceBase} onChange={setSourceBase} options={bases} />
      <InputField type="select" title={targetBaseTitle} value={targetBase} onChange={setTargetBase} options={bases} />
      <InputField type="text" title={textTitle} value={value} onChange={setValue} />
      <InputField type="text" title={resultTitle} value={result} readOnly copyButton />
    </StandardGrid>
  </PageGenerator>
}