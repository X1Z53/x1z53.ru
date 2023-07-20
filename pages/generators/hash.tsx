import { InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { generators } from "databases"
import { generateHash, getDatabaseObject } from "features/utils"
import { useEffect, useState } from "react"

export default function HashGenerator() {
  const algorithms = ["md5", "sha1", "sha3", "sha224", "sha256", "sha384", "sha512"]
  const [algorithm, setAlgorithm] = useState(algorithms[0])
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => { setResult(generateHash(text, algorithm)) }, [text, algorithm])

  const generator = getDatabaseObject(generators, "hash")

  return <PageCreator {...generator}>
    <StandardGrid>
      <InputField title="Текст" type="text" value={text} callback={setText} />
      <InputField title="Алгоритм" type="select" options={algorithms} value={algorithm} callback={setAlgorithm} />
    </StandardGrid>
    <InputField title="Результат" type="text" copyButton readOnly value={result} />
  </PageCreator>
}
