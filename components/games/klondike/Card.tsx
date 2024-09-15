import { Image } from "@chakra-ui/react"
import { memo, useEffect } from "react"
import { DragSourceMonitor, useDrag } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"
import { useDispatch } from "react-redux"
import {
  addCardsToFoundation,
  addCardsToStack,
  cardIsDragged,
  turnCard,
} from "store/actions"
import { CardState, PlayingCard } from "types"

// eslint-disable-next-line react/display-name
export const Card = memo(
  ({ card, isLastCard, width }: { card; isLastCard; width }) => {
    const { hidden, id, index, type } = card
    const dispatch = useDispatch()
    const [{ isDragging, item }, drag, preview] = useDrag({
      item: { type, card },
      type: type,
      end: (
        item: { type: string; card: PlayingCard } | undefined,
        monitor: DragSourceMonitor,
      ) => {
        const dropResult: { nextState; index } = monitor.getDropResult()
        if (item && dropResult) {
          const nextState = dropResult.nextState
          if (nextState === CardState.Stack) {
            dispatch(
              addCardsToStack({
                movedCard: item.card,
                index: dropResult.index,
                nextState,
              }),
            )
          } else if (nextState === CardState.Foundation) {
            dispatch(
              addCardsToFoundation({
                movedCard: item.card,
                index: dropResult.index,
                nextState,
              }),
            )
          }
        }
        if (item && !dropResult) {
          dispatch(cardIsDragged({ movedCard: item.card, isDragging: false }))
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
      }),
      canDrag: () => !card.hidden,
    })

    useEffect(() => {
      if (item && item["card"] && isDragging) {
        dispatch(cardIsDragged({ movedCard: item["card"], isDragging }))
      }
    }, [isDragging, item, dispatch])

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: false })
    }, [preview])

    return (
      <Image
        {...{ width }}
        alt={card.id}
        ref={card.hidden ? null : drag}
        userSelect="none"
        padding="4pt"
        src={hidden ? "/games/cards/back.svg" : `/games/cards/${id}.svg`}
        display={card.isDragging ? "none" : undefined}
        cursor={!hidden ? "grab" : isLastCard && "pointer"}
        position="absolute"
        draggable={card.hidden && false}
        onClick={hidden ? () => dispatch(turnCard({ index, id })) : undefined}
      />
    )
  },
)
