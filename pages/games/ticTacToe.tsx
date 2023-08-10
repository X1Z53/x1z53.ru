import {
  Center,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Square,
  Text,
} from "@chakra-ui/react"
import { PageGenerator } from "components"
import { games } from "databases"
import { useEffect, useState } from "react"
import { FiCircle } from "react-icons/fi"
import { IoClose } from "react-icons/io5"

export default function TicTacToe() {
  const figures = {
    O: <FiCircle fontSize="7.5vh" />,
    X: <IoClose fontSize="10vh" />,
  }
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const defaultBoard = { ...[...Array(9)] }
  const [board, setBoard] = useState(defaultBoard)
  const [player, setPlayer] = useState("X")
  const [winner, setWinner] = useState("")

  useEffect(() => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo
      board[a] &&
        board[a] === board[b] &&
        board[a] === board[c] &&
        setWinner(board[a])
    }

    !winner && Object.values(board).every((cell) => cell) && setWinner("-")
  }, [board])

  return (
    <PageGenerator database={games} name="ticTacToe">
      <Modal
        isOpen={!!winner}
        onClose={() => {
          setWinner("")
          setBoard(defaultBoard)
          setPlayer("X")
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Finish</ModalHeader>
          <ModalBody>
            {winner === "-" ? (
              <Text>No one has won</Text>
            ) : (
              <Text>
                Player <Kbd>{winner}</Kbd> win the Game!
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Center>
        <SimpleGrid columns={3}>
          {Object.values(board).map((item, index) => (
            <Square
              backgroundColor="white"
              border="1px solid black"
              color="black"
              key={index}
              onClick={() => {
                if (item) return

                setBoard((board) => ({ ...board, [index]: player }))
                setPlayer((currentFigure) =>
                  currentFigure === "X" ? "O" : "X",
                )
              }}
              size="10vh"
            >
              {figures[item]}
            </Square>
          ))}
        </SimpleGrid>
      </Center>
    </PageGenerator>
  )
}
