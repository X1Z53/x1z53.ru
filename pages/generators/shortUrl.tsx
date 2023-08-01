import { InputField, PageGenerator, StandardGrid } from "components"
import { generators } from "databases"
import ky from "ky"
import { getDatabaseObject, getLocaled } from "modules"
import { useEffect, useState } from "react"

export default function shortUrl() {
  const { textTitle, resultTitle } = getLocaled({
    ru: { textTitle: "Текст", resultTitle: "Результат" },
    en: { textTitle: "Text", resultTitle: "Result" }
  })

  const [text, setText] = useState("x1z53.ru")
  const [result, setResult] = useState("")

  useEffect(() => {
    ky(`https://clck.ru/--?url=${text}`).text()
      .then(result => { setResult(result) })
  }, [text])

  return <PageGenerator {...getDatabaseObject(getLocaled(generators), "shortUrl")}>
    <StandardGrid>
      <InputField type="text" title={textTitle} value={text} onChange={setText} />
      <InputField type="text" title={resultTitle} copyButton readOnly value={result} onChange={setResult} />
    </StandardGrid>
  </PageGenerator>
}