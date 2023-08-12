import { Center, Text } from "@chakra-ui/react"
import { getLocaledTitles } from "modules"
import { useTetris } from "modules/utils/useTetris"

const GameOver = (): JSX.Element => {
  const { gameOver, score: scoreTitle } = getLocaledTitles()
  const { score } = useTetris()

  return (
    <Center flexDirection="column">
      <Text>{gameOver}</Text>
      <Text>{scoreTitle}</Text>
      <Text>{score}</Text>
    </Center>
  )
}

export default GameOver
