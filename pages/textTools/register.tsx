import { InputField, PageCreator, StandardGrid } from "components"
import { textTools } from "databases"
import { getDatabaseObject } from "features"
import { useState } from "react"

export default function ChangeRegister() {
  const [text, setText] = useState("Hello, World!")
  const buttons = ["Верхний регистр", "Нижний регистр", "Чередовать с маленькой", "Чередовать с большой", "Инверсия", "Случайный", "С заглавной буквы"]
  const [button, setButton] = useState("Верхний регистр")
  const result = text
    .split(" ")
    .map(word => {
      switch (button) {
        case "Верхний регистр":
          return word.toUpperCase()
        case "Нижний регистр":
          return word.toLowerCase()
        case "Чередовать с маленькой":
          return word.split("").map((char, index) => index % 2 ? char.toUpperCase() : char.toLowerCase()).join("")
        case "Чередовать с большой":
          return word.split("").map((char, index) => index % 2 ? char.toLowerCase() : char.toUpperCase()).join("")
        case "Инверсия":
          return word.split("").map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join("")
        case "Случайный":
          return word.split("").map(char => Math.random() > 0.5 ? char.toLowerCase() : char.toUpperCase()).join("")
        case "С заглавной буквы":
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
    })
    .join(" ")

  const textTool = getDatabaseObject(textTools, "changeRegister")
  return <PageCreator {...textTool}>
    <StandardGrid>
      <InputField type="text" title="Текст" value={text} onChange={setText} />
      <InputField type="select" title="Изменение" value={button} onChange={setButton} options={buttons} />
    </StandardGrid>
    <InputField type="text" title="Результат" value={result} readOnly copyButton />
  </PageCreator>
}