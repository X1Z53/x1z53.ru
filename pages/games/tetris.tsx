import { PageGenerator } from "components"
import { Tetris } from "components/games/tetris"
import { games } from "databases"
import { TetrisProvider } from "modules/utils/useTetris"

const TetrisPage = () => {
  return (
    <PageGenerator database={games} name="tetris">
      <TetrisProvider>
        <Tetris />
      </TetrisProvider>
    </PageGenerator>
  )
}

export default TetrisPage
