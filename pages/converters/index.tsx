import { CardGrid, Description } from "components"
import { converters } from "databases"
import { getLocaled } from "modules"

export default function Converters() {
  return (
    <>
      <Description
        description={
          "Здесь вы найдете полезные конвертеры для преобразования различных единиц измерения и текста. Простой и удобный инструментарий поможет вам перевести значения между различными системами измерений: длина, масса, системы счисления и многое другое. Упростите свои вычисления с помощью этих онлайн-конвертеров."
        }
      />
      <CardGrid cards={getLocaled(converters)} />
    </>
  )
}
