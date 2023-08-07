import { Box, Flex } from "@chakra-ui/react"
import { Card } from "components"
import { useDrop } from "react-dnd"
import { CardState, DraggedItem, PlayingCard, StackProps } from "types"

const getDroppable = (item: DraggedItem, cards: PlayingCard[]): boolean => {
  if (cards.length === 0 && item && item.card && item.card.rank === 13) {
    return true
  } else if (cards.length === 0) {
    return false
  } else if (
    item &&
    item.card &&
    item.card.rank === cards[cards.length - 1].rank - 1 &&
    item.card.color !== cards[cards.length - 1].color
  ) {
    return true
  }
  return false
}

export const Stack = ({ cards, index, width }: StackProps) => {
  const nextState = CardState.Stack
  const [, drop] = useDrop({
    accept: "card",
    canDrop: (item) => getDroppable(item, cards),
    drop: () => ({ index, nextState }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
    <Box ref={drop} {...{ width }}>
      {cards.map((card, index) => (
        <Flex key={card.id} position="relative" paddingBottom={"2vw"}>
          <Card
            {...{ width }}
            card={card}
            isLastCard={index === cards.length - 1 ? true : false}
          />
        </Flex>
      ))}
      <Box />
    </Box>
  )
}
