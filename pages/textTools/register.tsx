import { InputField, PageGenerator, StandardGrid } from "components"
import { textTools } from "databases"
import { getLocaled, getLocaledTitles } from "modules"
import { useState } from "react"

export default function ChangeRegister() {
  const titles = getLocaledTitles()
  const { buttons } = getLocaled({
    ru: {
      buttons: ["Прописные", "Строчные", "Чередовать (со строчной)", "Чередовать (с прописной)", "Инверсия", "Случайный", "С заглавной буквы"],
    },
    en: {
      buttons: ["Upper case", "Lower case", "Alternate (from lower)", "Alternate (from upper)", "Inversion", "Random", "With capital"],
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

  return <PageGenerator database={textTools} name="register">
    <StandardGrid>
      <InputField type="text" title={titles.text} value={text} onChange={setText} />
      <InputField type="select" title={titles.modificator} value={button} onChange={setButton} options={buttons} />
    </StandardGrid>
    <InputField type="text" title={titles.result} value={result} readOnly copyButton />
  </PageGenerator>
}