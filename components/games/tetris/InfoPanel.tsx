import { Box, Button, Flex, Kbd, Text } from "@chakra-ui/react"
import { ActiveGame } from "components/games/tetris"
import { getLocaledTitles } from "modules"
import { useTetris } from "modules/utils/useTetris"
import Link from "next/link"

export default function InfoPanel() {
  const { originalGame, controls, move, rotate, fastDrop, drop, space } =
    getLocaledTitles()
  const gameState = useTetris()

  return (
    <Flex
      height="100%"
      padding="20px"
      textAlign="center"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Box>
        {gameState.started && <ActiveGame />}
        <Button whiteSpace="normal" height="auto">
          <Link target="_blank" href={"https://react-tetris-alpha.vercel.app/"}>
            {originalGame}
          </Link>
        </Button>
      </Box>
      <Box>
        <Text>{controls}</Text>
        <Flex justifyContent="space-between">
          <Text>{move}</Text>
          <Box>
            <Kbd>←</Kbd>
            <Kbd>→</Kbd>
          </Box>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{rotate}</Text>
          <Box>
            <Kbd>↑</Kbd>
          </Box>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{fastDrop}</Text>
          <Box>
            <Kbd>↓</Kbd>
          </Box>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{drop}</Text>
          <Box>
            <Kbd>{space}</Kbd>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}
