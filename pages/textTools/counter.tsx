import { InputField, PageGenerator, StandardGrid } from "components"
import { textTools } from "databases"
import { getLocaledTitles } from "modules"
import { useState } from "react"

export default function Counter() {
  const titles = getLocaledTitles()
  const [text, setText] = useState("Hello, World!")

  return <PageGenerator database={textTools} name="counter">
    <InputField type="text" title={titles.text} value={text} onChange={setText} />
    <StandardGrid>
      <InputField type="text" title={titles.symbolsCount} value={String(text.split("").length)} readOnly copyButton />
      <InputField type="text" title={titles.wordsCount} value={String(text.split(" ").length)} readOnly copyButton />
      <InputField type="text" title={titles.withoutSpaces} value={String(text.split("").filter(char => char !== " ").length)} readOnly copyButton />
      <InputField type="text" title={titles.withoutPunctuation} value={String(text.split("").filter(char => !",.!?;:".includes(char)).length)} readOnly copyButton />
    </StandardGrid>
  </PageGenerator>
}