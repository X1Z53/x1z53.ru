import { InputField, PageGenerator, StandardGrid } from "components"
import { converters } from "databases"
import * as databases from "databases/converters"
import { getLocaled, getLocaledTitles } from "modules"
import { useState } from "react"
import { ConverterPageGeneratorProps } from "types"

export default function ConverterPageGenerator({
  name,
  defaultSourcBase, defaultTargetBase
}: ConverterPageGeneratorProps) {
  const { bases: allBases, coefficients } = databases[name]
  const bases = getLocaled(allBases)
  const titles = getLocaledTitles()
  const [value, setValue] = useState("1")
  const [sourceBase, setSourceBase] = useState(defaultSourcBase)
  const [targetBase, setTargetBase] = useState(defaultTargetBase)
  const result = String(Number(value) * coefficients.find(({ name }) => name === sourceBase)[targetBase])

  return <PageGenerator database={converters} {...{name}}>
    <StandardGrid>
      <InputField type="select" title={titles.sourceBase} value={sourceBase} onChange={setSourceBase} options={bases} />
      <InputField type="select" title={titles.targetBase} value={targetBase} onChange={setTargetBase} options={bases} />
      <InputField type="text" title={titles.value} value={value} onChange={setValue} />
      <InputField type="text" title={titles.result} value={result} readOnly copyButton />
    </StandardGrid>
  </PageGenerator>
}