import { CardGrid } from "components/layout"
import { Description } from "components/seo"
import { ciphers } from "databases"

export default function Ciphers() {
  return <>
    <Description description={
      "Изучайте мир шифров и криптографии. Узнайте о шифра и криптографических методах. Расшифруйте тайные послания и познайте искусство защиты информации. Простые и удобные инструменты ждут вас!"
    } />
    <CardGrid cards={ciphers} />
  </>
}