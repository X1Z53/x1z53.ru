import { InputField, PageGenerator, StandardGrid } from "components"
import { generators } from "databases"
import { getLocaledTitles, hash } from "modules"
import { useEffect, useState } from "react"

export default function HashGenerator() {
  const titles = getLocaledTitles()
  const algorithms = [
    "md5",
    "sha1",
    "sha3",
    "sha224",
    "sha256",
    "sha384",
    "sha512",
  ]
  const [algorithm, setAlgorithm] = useState(algorithms[0])
  const [text, setText] = useState("Hello, World!")
  const [result, setResult] = useState("")

  useEffect(() => {
    setResult(hash(text, algorithm))
  }, [text, algorithm])

  return (
    <PageGenerator database={generators} name="hash">
      <StandardGrid>
        <InputField type="text" value={text} onChange={setText} />
        <InputField
          title={titles.algorithm}
          type="select"
          options={algorithms}
          value={algorithm}
          onChange={setAlgorithm}
        />
      </StandardGrid>
      <InputField
        title={titles.result}
        type="text"
        copyButton
        readOnly
        value={result}
      />
    </PageGenerator>
  )
}
