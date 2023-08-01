import { InputField, PageGenerator, StandardGrid } from "components"
import { textTools } from "databases"
import { getDatabaseObject, getLocaled } from "modules"
import { useState } from "react"

export default function Counter() {
  const [text, setText] = useState("Hello, World!")

  const { textTitle, symbolsCountTitle, wordsCountTitle, withoutSpacesTitle, withoutPunctuationTitle } = getLocaled({
    ru: { textTitle: "Текст", symbolsCountTitle: "Количество символов", wordsCountTitle: "Количество слов", withoutSpacesTitle: "Без пробелов", withoutPunctuationTitle: "Без пунктуации" },
    en: { textTitle: "Text", symbolsCountTitle: "Symbols count", wordsCountTitle: "Words count", withoutSpacesTitle: "Without spaces", withoutPunctuationTitle: "Without punctuation" }
  })

  return <PageGenerator {...getDatabaseObject(getLocaled(textTools), "counter")}>
    <StandardGrid columns={1}>
      <InputField type="text" title={textTitle} value={text} onChange={setText} />
      <StandardGrid>
        <InputField type="text" title={symbolsCountTitle} value={String(text.split("").length)} readOnly copyButton />
        <InputField type="text" title={wordsCountTitle} value={String(text.split(" ").length)} readOnly copyButton />
        <InputField type="text" title={withoutSpacesTitle} value={String(text.split("").filter(char => char !== " ").length)} readOnly copyButton />
        <InputField type="text" title={withoutPunctuationTitle} value={String(text.split("").filter(char => !",.!?;:".includes(char)).length)} readOnly copyButton />
      </StandardGrid>
    </StandardGrid>
  </PageGenerator>
}