import { Box, Center, Flex, Text } from "@chakra-ui/react"
import { Cell } from "components/games/tetris"
import { getLocaledTitles } from "modules"
import {
  EMPTY_DISPLAY_CELLS_3x3,
  EMPTY_DISPLAY_CELLS_4x3,
  ROTATION_MATRIX,
} from "modules/games/tetris/constants"
import { isTetriminoInPosition } from "modules/games/tetris/helpers"
import { useTetris } from "modules/utils/useTetris"

const ActiveGame = (): JSX.Element => {
  const { next, level, score } = getLocaledTitles()
  const gameState = useTetris()

  const EmptyDisplayCells = "IO".includes(gameState.nextTetrominos[0])
    ? EMPTY_DISPLAY_CELLS_4x3
    : EMPTY_DISPLAY_CELLS_3x3

  return (
    <Box>
      <Text>{next}</Text>
      <Center>
        <Box width={"IO".includes(gameState.nextTetrominos[0]) ? "65%" : "50%"}>
          {EmptyDisplayCells.map((row, rowIndex) => (
            <Flex key={rowIndex}>
              {row.map((col, colIndex) => (
                <Box flex={1} aspectRatio={1} key={colIndex}>
                  {isTetriminoInPosition(
                    [
                      {
                        row: ROTATION_MATRIX[
                          gameState.nextTetrominos[0]
                        ][0][0][0],
                        col: ROTATION_MATRIX[
                          gameState.nextTetrominos[0]
                        ][0][0][1],
                      },
                      {
                        row: ROTATION_MATRIX[
                          gameState.nextTetrominos[0]
                        ][1][0][0],
                        col: ROTATION_MATRIX[
                          gameState.nextTetrominos[0]
                        ][1][0][1],
                      },
                      {
                        row: ROTATION_MATRIX[
                          gameState.nextTetrominos[0]
                        ][2][0][0],
                        col: ROTATION_MATRIX[
                          gameState.nextTetrominos[0]
                        ][2][0][1],
                      },
                      {
                        row: ROTATION_MATRIX[
                          gameState.nextTetrominos[0]
                        ][3][0][0],
                        col: ROTATION_MATRIX[
                          gameState.nextTetrominos[0]
                        ][3][0][1],
                      },
                    ],
                    {
                      row: rowIndex,
                      col: colIndex,
                    },
                  ) && <Cell tetromino={gameState.nextTetrominos[0]} />}
                </Box>
              ))}
            </Flex>
          ))}
        </Box>
      </Center>
      <Flex justifyContent="space-between">
        <Text>{level}</Text>
        <Text>{gameState.level}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{score}</Text>
        <Text>{gameState.score}</Text>
      </Flex>
    </Box>
  )
}

export default ActiveGame
