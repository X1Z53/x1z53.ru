import { CardGrid, Description } from "components"
import { fileReaders } from "databases"
import { getLocaled } from "modules"

export default function Converters() {
  return (
    <>
      <Description
        description={
          "Если у вас нет возможности открыть файл в вашем ПО, то вы пришли по адресу. Здесь вы сможете считать файлы в онлайн режиме"
        }
      />
      <CardGrid cards={getLocaled(fileReaders)} />
    </>
  )
}
