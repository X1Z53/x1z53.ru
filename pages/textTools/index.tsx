import { CardGrid, Description } from "components"
import { textTools } from "databases"
import { getLocaled } from "modules"

export default function Generators() {
  return (
    <>
      <Description description="Вам нужно отредактировать текст или сделать его более красивым? Тогда вы по адресу! Маленькие и полезные инструменты для работы с текстом прямо здесь." />
      <CardGrid cards={getLocaled(textTools)} />
    </>
  )
}
