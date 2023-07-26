import { InputField, PageCreator, StandardGrid } from "components"
import { generators } from "databases"
import { getDatabaseObject } from "features"
import ky from "ky"
import { useEffect, useState } from "react"

export default function shortUrl() {
  const [text, setText] = useState("x1z53.ru")
  const [result, setResult] = useState("")

  useEffect(() => {
    ky(`https://clck.ru/--?url=${text}`).text()
      .then(result => { setResult(result) })
  }, [text])

  return <PageCreator {...getDatabaseObject(generators, "shortUrl")}>
    <StandardGrid>
      <InputField type="text" title="Текст" value={text} onChange={setText} />
      <InputField type="text" title="Результат" copyButton readOnly value={result} onChange={setResult} />
    </StandardGrid>
  </PageCreator>
}