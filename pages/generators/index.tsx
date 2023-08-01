import { CardGrid, Description } from "components"
import { generators } from "databases"
import { getLocaled } from "modules"

export default function Generators() {
  return <>
    <Description description={
      "Удобные и простые генераторы, которые помогут упростить вашу жизнь: делитесь короткими ссылками или красивыми QR-кодами или сгенерируйте надёжный пароль. Всё это и не только ждёт вас здесь"
    } />
    <CardGrid cards={getLocaled(generators)} />
  </>
}