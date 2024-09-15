import { Box, Flex, Icon } from "@chakra-ui/react"
import { Card } from "components"
import { useDrop } from "react-dnd"
import {
  BsSuitClub,
  BsSuitDiamond,
  BsSuitHeart,
  BsSuitSpade,
} from "react-icons/bs"
import { useSelector } from "react-redux"
import { RootState } from "store"
import { selectStacks } from "store/reducers"
import { CardState, PlayingCard } from "types"

interface DraggedItem {
  type: string
  card: PlayingCard
}

interface FoundationProps {
  cards: PlayingCard[]
  index: number
  width: string[]
  foundationSuit: string
  nextCard: number
}

const getDroppable = (
  item: DraggedItem,
  nextCard: number,
  foundationSuit: string,
  stack: PlayingCard[],
): boolean => {
  const id = item.card?.id
  if (item && item.card && item.card.state === CardState.Stack) {
    if (item.card.id !== stack[stack.length - 1].id) {
      return false
    }
  }
  return id === foundationSuit + nextCard
}

const suits = {
  club: <Icon as={BsSuitClub} fill="black" boxSize="4vw" />,
  spade: <Icon as={BsSuitSpade} fill="black" boxSize="4vw" />,
  diamond: <Icon as={BsSuitDiamond} fill="red" boxSize="4vw" />,
  heart: <Icon as={BsSuitHeart} fill="red" boxSize="4vw" />,
}

export const Foundation = ({
  cards,
  index,
  foundationSuit,
  width,
  nextCard,
}: FoundationProps) => {
  const nextState = CardState.Foundation
  const stacks = useSelector<RootState, PlayingCard[][]>(selectStacks)
  const [, drop] = useDrop({
    accept: "card",
    canDrop: (item: DraggedItem) =>
      getDroppable(item, nextCard, foundationSuit, stacks[item.card.index]),
    drop: () => ({
      index,
      nextState,
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
    <Box ref={drop} {...{ width }}>
      <Flex
        border="0.1vw dashed grey"
        userSelect="none"
        display={cards.length ? "none" : "flex"}
        justifyContent="center"
        alignItems="center"
        marginX="4pt"
        borderRadius="0.5vw"
        height="full"
        position="relative"
      >
        {suits[foundationSuit]}
      </Flex>
      {cards.map((card: PlayingCard, i: number) => (
        <Card
          {...{ width }}
          key={card.id}
          card={card}
          isLastCard={i === cards.length - 1 ? true : false}
        />
      ))}
    </Box>
  )
}
