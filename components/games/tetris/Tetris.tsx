import { Box, Button, Center } from "@chakra-ui/react"
import { BoardCells, GameOver, InfoPanel } from "components/games/tetris"
import { getLocaledTitles } from "modules"
import { useTetris, useTetrisActions } from "modules/utils/useTetris"
import { useEffect } from "react"
import useSound from "use-sound"

const pressedKeys: { [key in string]: boolean } = {}
let moveCooldown = false
let moveCooldownTimeout: NodeJS.Timeout
const INPUT_INTERVAL = 50
const MOVE_COOLDOWN = 200

const Tetris = (): JSX.Element => {
  const { play, playAgain } = getLocaledTitles()

  const [moveSound] = useSound("/games/tetris/move.wav", { volume: 0.25 })
  const [rotateSound] = useSound("/games/tetris/rotate.wav", { volume: 0.25 })
  const [placeSound] = useSound("/games/tetris/place.wav", { volume: 0.25 })
  const [dropSound] = useSound("/games/tetris/drop.wav", { volume: 0.25 })
  const [clearSound] = useSound("/games/tetris/clear.wav", { volume: 0.25 })
  const [endSound] = useSound("/games/tetris/end.wav", { volume: 0.25 })
  const [trickSound] = useSound("/games/tetris/trick.wav", { volume: 0.25 })
  const [tetrisSound] = useSound("/games/tetris/tetris.wav", { volume: 0.25 })

  const gameState = useTetris()
  const { rotate, move, start, fastDrop, hardDrop, registerCallback } =
    useTetrisActions()

  useEffect(() => {
    registerCallback("onMove", moveSound)
    registerCallback("onRotate", rotateSound)
    registerCallback("onHardDrop", dropSound)
    registerCallback("onPlace", placeSound)
    registerCallback("onClear", clearSound)
    registerCallback("onGameOver", endSound)
    registerCallback("onSRSTrick", trickSound)
    registerCallback("onTetris", tetrisSound)
  }, [
    registerCallback,
    dropSound,
    moveSound,
    rotateSound,
    clearSound,
    endSound,
    trickSound,
    tetrisSound,
    placeSound,
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      if (pressedKeys["ArrowLeft"] && !moveCooldown) move("left")
      if (pressedKeys["ArrowRight"] && !moveCooldown) move("right")
    }, INPUT_INTERVAL)
    return () => {
      clearInterval(interval)
    }
  }, [rotate, start, move, fastDrop, hardDrop])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter" && !event.repeat) start()
      if (event.code === "ArrowLeft" && !event.repeat) {
        clearTimeout(moveCooldownTimeout)
        moveCooldown = true
        moveCooldownTimeout = setTimeout(() => {
          moveCooldown = false
        }, MOVE_COOLDOWN)
        move("left")
      }
      if (event.code === "ArrowRight" && !event.repeat) {
        clearTimeout(moveCooldownTimeout)
        moveCooldown = true
        moveCooldownTimeout = setTimeout(() => {
          moveCooldown = false
        }, MOVE_COOLDOWN)
        move("right")
      }
      if (event.code === "ArrowUp" && !event.repeat) rotate("left")
      if (event.code === "ArrowDown") fastDrop(true)
      if (event.code === "Space" && !event.repeat) hardDrop()
      pressedKeys[event.code] = true
    }
    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys[event.code] = false
      if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
        clearTimeout(moveCooldownTimeout)
        moveCooldown = false
      }
      if (event.code === "ArrowDown") fastDrop(false)
    }

    document.addEventListener("keydown", handleKeyDown, false)
    document.addEventListener("keyup", handleKeyUp, false)

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false)
      document.removeEventListener("keydown", handleKeyUp, false)
    }
  }, [rotate, start, move, fastDrop, hardDrop])

  const handleStartClick = () => start()

  return (
    <Center height="50vh" gap="20px">
      <Box height="100%" border="2px solid currentColor" width="25vh">
        {!gameState.started ? (
          <Center flexDirection="column" height="100%" gap={10}>
            {gameState.gameOver && <GameOver />}
            <Button fontWeight="bold" onClick={handleStartClick}>
              {gameState.gameOver ? playAgain : play}
            </Button>
          </Center>
        ) : (
          <BoardCells />
        )}
      </Box>
      <Box height="100%" border="2px solid currentColor" width="30vh">
        <InfoPanel />
      </Box>
    </Center>
  )
}

export default Tetris
