import { CardGrid, Description } from "components"
import { games } from "databases"
import { getLocaled } from "modules"

export default function Converters() {
  return (
    <>
      <Description
        description={
          "Добро пожаловать на нашу страницу с играми на одного игрока! Наслаждайтесь любимыми настольными играми для вас и компьютера."
        }
      />
      <CardGrid cards={getLocaled(games)} />
    </>
  )
}
