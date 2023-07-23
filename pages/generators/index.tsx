import { CardGrid } from "components/layout"
import { Description } from "components/seo"
import { generators } from "databases"

export default function Generators() {
  return <>
    <Description description={
      "Удобные и простые генераторы, которые помогут упростить вашу жизнь: делитесь короткими ссылками или красивыми QR-кодами или сгенерируйте надёжный пароль. Всё это и не только ждёт вас здесь"
    } />
    <CardGrid cards={generators} />
  </>
}