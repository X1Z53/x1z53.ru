import { Box, Button, Center, Flex, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { PageGenerator } from "components"
import { games } from "databases"
import { getLocaledTitles } from "modules"
import { Card, CardDragPreview, Foundation, Stack } from "modules/klondike/components"
import { createNewGame, suits } from "modules/klondike/utils"
import Link from "next/link"
import { useEffect } from "react"
import { IoReload } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "redux"
import { RootState } from "store"
import { GameActions, HistoryActions, clearHistory, drawCard, startNewGame, undoMove } from "store/actions"
import { selectDeck, selectFoundations, selectStacks, selectWaste } from "store/reducers"
import { PlayingCard } from "types"

function Buttons() {
  const { undo, restart } = getLocaledTitles()
  const dispatch = useDispatch<Dispatch<GameActions | HistoryActions>>()
  const handleUndoMove = () => dispatch(undoMove())

  const handleStartNewGame = () => {
    const { stacks, deck } = createNewGame()
    dispatch(clearHistory())
    dispatch(startNewGame({ stacks, deck }))
  }

  useEffect(() => {
    dispatch(startNewGame(createNewGame()))
  }, [dispatch])

  return <Flex flexDirection="column" width="10vw" alignItems="center" justifyContent="space-evenly">
    {[[handleUndoMove, undo], [handleStartNewGame, restart]].map(([func, text]: [() => void, string]) =>
      <Button key={text} fontSize={"1vw"} height={["full", "full", "2vw"]} border="0.1vw solid white" width={["full", "full", "7vw"]} onClick={func}>{text}</Button>
    )}
  </Flex>
}

function DeckStack() {
  const deck = useSelector(selectDeck)
  const dispatch = useDispatch()

  return deck.length ? <Image
    onClick={() => dispatch(drawCard())}
    alt="deck"
    src={deck.length - 1 ? "/cards/deck.svg" : "/cards/back.svg"}
    onDragStart={event => {
      event.preventDefault()
      event.stopPropagation()
    }}
    userSelect="none"
    width="10vw"
  /> : <Flex
    onClick={() => dispatch(drawCard())}
    width="10vw"
    aspectRatio={225 / 325}
    border="0.1vw solid black"
    userSelect="none"
    justifyContent="center"
    alignItems="center"
    borderRadius="0.5vw"
    height="full"
    position="relative"
    backgroundColor="white"
  >
    <Icon as={IoReload} fill="black" stroke="black" boxSize="4vw" />
  </Flex>
}
function DeckCard() {
  const waste = useSelector<RootState, PlayingCard[]>(selectWaste)

  return <Box width="10vw">
    {waste.length > 0 &&
      waste.map((card, i) => <Card key={card.id} card={card} isLastCard={i === waste.length - 1} />)
    }
  </Box>
}

function Homes() {
  const foundations = useSelector<RootState, PlayingCard[][]>(selectFoundations)

  return foundations.map((foundation, i) => (
    <Foundation
      key={i.toString()}
      cards={foundation}
      index={i}
      foundationSuit={suits[i]}
      nextCard={foundation.length + 1}
    />
  ))
}

export default function Game() {
  const { congratulations, youWon, originalGame } = getLocaledTitles()
  const stacks = useSelector<RootState, PlayingCard[][]>(selectStacks)
  const { onClose } = useDisclosure()

  const dispatch = useDispatch<Dispatch<GameActions | HistoryActions>>()

  const handleStartNewGame = () => {
    const { stacks, deck } = createNewGame()
    dispatch(clearHistory())
    dispatch(startNewGame({ stacks, deck }))
  }
  return <PageGenerator database={games} name="klondike">
    <Modal isOpen={!stacks.flat().length} onClose={() => {
      onClose()
      handleStartNewGame()
    }}>
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{congratulations}</ModalHeader>
        <ModalBody>{youWon}</ModalBody>
        <ModalFooter>
          <Link href={"https://github.com/mikkovor/solitaire"} target="_blank">
            <Text fontSize={10}>{originalGame}</Text>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Center flexDirection="column" height="120vh" justifyContent="start">
      <CardDragPreview stacks={stacks} />
      <Flex width="70vw">
        <DeckStack />
        <DeckCard />
        <Buttons />
        <Homes />
      </Flex>
      <Flex>
        {stacks.map((pile, i) => (
          <Stack cards={pile} key={i.toString()} index={i} />
        ))}
      </Flex>
    </Center>
  </PageGenerator>
}
