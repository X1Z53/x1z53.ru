import { CardGrid, Description } from "components"
import { musicTools } from "databases"
import { getLocaled } from "modules"

export default function Generators() {
  return <>
    <Description description={
      "Удобные и надёжные онлайн инструменты для работы в музыкальной сфере: виртуальные инструменты, редакторы звуковых файлов и другое"
    } />
    <CardGrid cards={getLocaled(musicTools)} />
  </>
}