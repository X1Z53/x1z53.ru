import { CardGrid } from "components/layout"
import { Description } from "components/seo"
import { musicTools } from "databases"

export default function Generators() {
  return <>
    <Description description={
      "Удобные и надёжные онлайн инструменты для работы в музыкальной сфере: виртуальные инструменты, редакторы звуковых файлов и другое"
    } />
    <CardGrid cards={musicTools} />
  </>
}