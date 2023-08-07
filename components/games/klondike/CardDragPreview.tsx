import { Box, Image } from "@chakra-ui/react"
import { memo, useMemo, useState } from "react"
import { Preview } from "react-dnd-preview"
import { CardState, PlayingCard } from "types"

const createPreviewCards = (
  draggedCard: PlayingCard | null,
  stacks: PlayingCard[][],
): PlayingCard[] => {
  if (!draggedCard) return []

  const indexOfCard = stacks[draggedCard.index].findIndex(
    (card) => card.id === draggedCard.id,
  )
  return stacks[draggedCard.index].filter((card, index) => index >= indexOfCard)
}

// eslint-disable-next-line react/display-name
export const CardDragPreview = memo(
  ({ stacks, width }: { stacks: PlayingCard[][]; width }) => {
    const [draggedCard, setDraggedCard] = useState<PlayingCard | null>(null)
    const memoizedPreview = useMemo(
      () => createPreviewCards(draggedCard, stacks),
      [draggedCard, stacks],
    )

    const generatePreview = ({ item, style }) => {
      if (item && item.card) setDraggedCard(item.card)

      return item && item.card.state === CardState.Stack ? (
        <Box zIndex={1}>
          {memoizedPreview.map((card, index) => (
            <Image
              {...style}
              {...{ width }}
              top={2 * index + "vw"}
              alt={item.card.id}
              key={card.id}
              src={`/cards/${card.id}.svg`}
            />
          ))}
        </Box>
      ) : (
        <Image
          {...style}
          {...{ width }}
          alt={item.card.id}
          src={`/cards/${item.card.id}.svg`}
          zIndex={1}
        />
      )
    }

    return <Preview generator={generatePreview} />
  },
)
