import { Box } from "@chakra-ui/react"
import { TETROMINO_COLORS } from "modules/games/tetris/constants"
import { Tetromino } from "types/tetris"

type CellProps = {
  tetromino: Tetromino | null
  isProjection?: boolean
}

const Cell = ({ tetromino, isProjection }: CellProps): JSX.Element => {
  const color = tetromino ? TETROMINO_COLORS[tetromino] : "#b0b0ae"
  return (
    <Box
      border={`1px solid ${color}`}
      color={color}
      opacity={!tetromino ? 0 : isProjection ? 0.4 : 1}
      height="100%"
      padding="20%"
      textAlign="center"
      flex={1}
    >
      <Box
        backgroundColor={color}
        opacity={!tetromino ? 0 : isProjection ? 0.4 : 1}
        height="100%"
        width="100%"
      />
    </Box>
  )
}

export default Cell
