import { CardGrid, Description } from "components"
import { ciphers } from "databases"
import { getLocaled } from "modules"

export default function Ciphers() {
  return <>
    <Description description={
      "Изучайте мир шифров и криптографии. Узнайте о шифра и криптографических методах. Расшифруйте тайные послания и познайте искусство защиты информации. Простые и удобные инструменты ждут вас!"
    } />
    <CardGrid cards={getLocaled(ciphers)} />
  </>
}