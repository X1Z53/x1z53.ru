import { InputField, PageGenerator, StandardGrid } from "components"
import { generators } from "databases"
import ky from "ky"
import { getLocaledTitles } from "modules"
import { useEffect, useState } from "react"

export default function shortUrl() {
  const titles = getLocaledTitles()
  const [text, setText] = useState("x1z53.ru")
  const [result, setResult] = useState("")

  useEffect(() => {
    ky(`https://clck.ru/--?url=${text}`)
      .text()
      .then((result) => {
        setResult(result)
      })
  }, [text])

  return (
    <PageGenerator database={generators} name="shortUrl">
      <StandardGrid>
        <InputField
          type="text"
          title={titles.text}
          value={text}
          onChange={setText}
        />
        <InputField
          type="text"
          title={titles.result}
          copyButton
          readOnly
          value={result}
          onChange={setResult}
        />
      </StandardGrid>
    </PageGenerator>
  )
}
