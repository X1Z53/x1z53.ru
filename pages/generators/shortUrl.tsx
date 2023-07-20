import { InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { generators } from "databases"
import { getDatabaseObject } from "features/utils"
import ky from "ky"
import { useEffect, useState } from "react"

export default function shortUrl() {
  const [text, setText] = useState("x1z53.ru")
  const [result, setResult] = useState("")

  useEffect(() => {
    ky(`https://clck.ru/--?url=${text}`).text()
      .then(result => { setResult(result) })
      .catch(error => { console.error(error) })
  }, [text])

  const generator = getDatabaseObject(generators, "shortUrl")

  return <PageCreator {...generator}>
    <StandardGrid>
      <InputField type="text" title="Текст" value={text} onChange={setText} />
      <InputField type="text" title="Результат" copyButton readOnly value={result} onChange={setResult} />
    </StandardGrid>
  </PageCreator>
}