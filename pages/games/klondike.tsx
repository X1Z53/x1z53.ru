import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import {
  Card,
  CardDragPreview,
  Foundation,
  PageGenerator,
  Stack,
} from "components"
import { games } from "databases"
import { createNewGame, getLocaledTitles, suits } from "modules"
import Link from "next/link"
import { useEffect } from "react"
import { IoReload } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "redux"
import { RootState } from "store"
import {
  GameActions,
  HistoryActions,
  clearHistory,
  drawCard,
  startNewGame,
  undoMove,
} from "store/actions"
import {
  selectDeck,
  selectFoundations,
  selectStacks,
  selectWaste,
} from "store/reducers"
import { PlayingCard } from "types"

function Buttons({ width }: { width }) {
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

  return (
    <Flex
      flexDirection="column"
      {...{ width }}
      alignItems="center"
      justifyContent="space-evenly"
    >
      {[
        [handleUndoMove, undo],
        [handleStartNewGame, restart],
      ].map(([func, text]: [() => void, string]) => (
        <Button
          key={text}
          fontSize={"1vw"}
          height={["full", "full", "2vw"]}
          border="0.1vw solid white"
          width={["full", "full", "7vw"]}
          onClick={func}
        >
          {text}
        </Button>
      ))}
    </Flex>
  )
}

function DeckStack({ width }: { width }) {
  const deck = useSelector(selectDeck)
  const dispatch = useDispatch()

  return deck.length ? (
    <Box {...{ width }} onClick={() => dispatch(drawCard())}>
      <Image
        {...{ width }}
        alt="deck"
        padding="4pt"
        src={
          deck.length - 1 ? "/games/cards/deck.svg" : "/games/cards/back.svg"
        }
        draggable={false}
        userSelect="none"
      />
    </Box>
  ) : (
    <Flex
      {...{ width }}
      onClick={() => dispatch(drawCard())}
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
  )
}
function DeckCard({ width }: { width }) {
  const waste = useSelector<RootState, PlayingCard[]>(selectWaste)

  return (
    <Box {...{ width }}>
      {waste.length > 0 &&
        waste.map((card, i) => (
          <Card
            {...{ width }}
            key={card.id}
            card={card}
            isLastCard={i === waste.length - 1}
          />
        ))}
    </Box>
  )
}

function Homes({ width }: { width }) {
  const foundations = useSelector<RootState, PlayingCard[][]>(selectFoundations)

  return foundations.map((foundation, i) => (
    <Foundation
      {...{ width }}
      key={i.toString()}
      cards={foundation}
      index={i}
      foundationSuit={suits[i]}
      nextCard={foundation.length + 1}
    />
  ))
}

export default function Klondike() {
  const { congratulations, youWon, originalGame } = getLocaledTitles()
  const stacks = useSelector<RootState, PlayingCard[][]>(selectStacks)
  const { onClose } = useDisclosure()
  const width = { base: 95 / 7 + "vw", xl: "8vw" }
  const dispatch = useDispatch<Dispatch<GameActions | HistoryActions>>()

  const handleStartNewGame = () => {
    const { stacks, deck } = createNewGame()
    dispatch(clearHistory())
    dispatch(startNewGame({ stacks, deck }))
  }
  return (
    <PageGenerator database={games} name="klondike">
      <Modal
        isOpen={!stacks.flat().length}
        onClose={() => {
          onClose()
          handleStartNewGame()
        }}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{congratulations}</ModalHeader>
          <ModalBody>{youWon}</ModalBody>
          <ModalFooter>
            <Link
              href={"https://github.com/mikkovor/solitaire"}
              target="_blank"
            >
              <Text fontSize={10}>{originalGame}</Text>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex height="120vh">
        <Center justifyContent="start" flexDirection="column" width="full">
          <CardDragPreview {...{ width }} stacks={stacks} />
          <Flex>
            <DeckStack {...{ width }} />
            <DeckCard {...{ width }} />
            <Buttons {...{ width }} />
            <Homes {...{ width }} />
          </Flex>
          <Flex>
            {stacks.map((pile, i) => (
              <Stack {...{ width }} cards={pile} key={i} index={i} />
            ))}
          </Flex>
        </Center>
      </Flex>
    </PageGenerator>
  )
}
