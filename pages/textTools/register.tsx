import { InputField, PageGenerator, StandardGrid } from "components"
import { textTools } from "databases"
import { getDatabaseObject, getLocaled } from "modules"
import { useState } from "react"

export default function ChangeRegister() {
  const { buttons, textTitle, modificatorTitle, resultTitle } = getLocaled({
    ru: {
      buttons: ["Прописные", "Строчные", "Чередовать (со строчной)", "Чередовать (с прописной)", "Инверсия", "Случайный", "С заглавной буквы"],
      textTitle: "Текст",
      modificatorTitle: "Модификатор",
      resultTitle: "Результат"
    },
    en: {
      buttons: ["Upper case", "Lower case", "Alternate (from lower)", "Alternate (from upper)", "Inversion", "Random", "With capital"],
      textTitle: "Text",
      modificatorTitle: "Modificator",
      resultTitle: "Result"
    }
  })
  
  const [text, setText] = useState("Hello, World!")
  const [button, setButton] = useState(buttons[0])
  const result = text
    .split(" ")
    .map(word => {
      switch (buttons.indexOf(button)) {
        case 0:
          return word.toUpperCase()
        case 1:
          return word.toLowerCase()
        case 2:
          return word.split("").map((char, index) => index % 2 ? char.toUpperCase() : char.toLowerCase()).join("")
        case 3:
          return word.split("").map((char, index) => index % 2 ? char.toLowerCase() : char.toUpperCase()).join("")
        case 4:
          return word.split("").map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join("")
        case 5:
          return word.split("").map(char => Math.random() > 0.5 ? char.toLowerCase() : char.toUpperCase()).join("")
        case 6:
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
    })
    .join(" ")

  return <PageGenerator {...getDatabaseObject(getLocaled(textTools), "changeRegister")}>
    <StandardGrid>
      <InputField type="text" title={textTitle} value={text} onChange={setText} />
      <InputField type="select" title={modificatorTitle} value={button} onChange={setButton} options={buttons} />
    </StandardGrid>
    <InputField type="text" title={resultTitle} value={result} readOnly copyButton />
  </PageGenerator>
}