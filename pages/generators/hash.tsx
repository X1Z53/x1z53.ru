import { InputField, PageCreator, StandardGrid } from "components"
import { generators } from "databases"
import { getDatabaseObject, hash } from "features"
import { useEffect, useState } from "react"

export default function HashGenerator() {
  const algorithms = ["md5", "sha1", "sha3", "sha224", "sha256", "sha384", "sha512"]
  const [algorithm, setAlgorithm] = useState(algorithms[0])
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => { setResult(hash(text, algorithm)) }, [text, algorithm])

  return <PageCreator {...getDatabaseObject(generators, "hash")}>
    <StandardGrid>
      <InputField title="Текст" type="text" value={text} onChange={setText} />
      <InputField title="Алгоритм" type="select" options={algorithms} value={algorithm} onChange={setAlgorithm} />
    </StandardGrid>
    <InputField title="Результат" type="text" copyButton readOnly value={result} />
  </PageCreator>
}
