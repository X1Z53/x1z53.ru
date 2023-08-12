import { Box, Flex } from "@chakra-ui/react"
import { Cell } from "components/games/tetris"
import { HIDDEN_ROWS } from "modules/games/tetris/constants"
import { isTetriminoInPosition } from "modules/games/tetris/helpers"
import { useTetris } from "modules/utils/useTetris"
import { BoardPoint } from "types/tetris"

const BoardCells = (): JSX.Element => {
  const gameState = useTetris()

  return (
    <Flex flexDirection="column" height="100%">
      {gameState.placedTetrominos.map((row, rowIndex) => {
        if (rowIndex < HIDDEN_ROWS) return
        return (
          <Flex flex={1} key={rowIndex}>
            {row.map((cell, colIndex) => {
              const point = { row: rowIndex, col: colIndex } as BoardPoint
              if (
                isTetriminoInPosition(gameState.activeTetromino.position, point)
              ) {
                return (
                  <Box flex={1} key={colIndex}>
                    <Cell tetromino={gameState.activeTetromino.type} />
                  </Box>
                )
              } else {
                if (
                  isTetriminoInPosition(
                    gameState.activeTetromino.projectedPlacePosition,
                    point,
                  )
                ) {
                  return (
                    <Box flex={1} key={colIndex}>
                      <Cell
                        tetromino={gameState.activeTetromino.type}
                        isProjection
                      />
                    </Box>
                  )
                } else {
                  return (
                    <Box flex={1} key={colIndex}>
                      <Cell tetromino={cell.tetromino} />
                    </Box>
                  )
                }
              }
            })}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default BoardCells
