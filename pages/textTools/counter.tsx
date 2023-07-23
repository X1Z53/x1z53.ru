import { InputField, StandardGrid } from "components"
import { useState } from "react"

export default function Counter() {
  const [text, setText] = useState("Hello, World!")

  return <>
    <InputField type="text" title="Текст" value={text} onChange={setText} />
    <StandardGrid>
      <InputField type="text" title="Количество символов" value={String(text.split("").length)} readOnly copyButton />
      <InputField type="text" title="Количество слов" value={String(text.split(" ").length)} readOnly copyButton />
      <InputField type="text" title="Без пробелов" value={String(text.split("").filter(char => char !== " ").length)} readOnly copyButton />
      <InputField type="text" title="Без знаков препинания" value={String(text.split("").filter(char => !",.!?;:".includes(char)).length)} readOnly copyButton />
    </StandardGrid>
  </>
}