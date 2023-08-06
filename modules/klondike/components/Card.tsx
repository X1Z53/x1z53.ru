import { Image } from "@chakra-ui/react"
import { memo, useEffect } from "react"
import { DragSourceMonitor, useDrag } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "redux"
import { addCardsToFoundation, addCardsToStack, cardIsDragged, handleDoubleClick, turnCard } from "store/actions"
import { selectNextFoundationCards } from "store/reducers"
import { CardState, PlayingCard } from "types"

const checkDoubleClick = (card: PlayingCard, nextFoundationCards: string[], dispatch: Dispatch): void => {
  if (nextFoundationCards.find(nextCard => nextCard === card.id)) {
    dispatch(handleDoubleClick({ doubleClickedCard: card }))
  }
}

// eslint-disable-next-line react/display-name
export const Card = memo(
  ({ card, isLastCard }: { card, isLastCard }) => {
    const { hidden, id, index, type } = card
    const dispatch = useDispatch()
    const nextFoundationCards = useSelector(selectNextFoundationCards)
    const [{ isDragging, item }, drag, preview] = useDrag({
      item: { type, card },
      type: type,
      end: (item: { type: string; card: PlayingCard } | undefined, monitor: DragSourceMonitor) => {
        const dropResult: { nextState, index } = monitor.getDropResult()
        if (item && dropResult) {
          const nextState = dropResult.nextState
          if (nextState === CardState.Stack) {
            dispatch(addCardsToStack({ movedCard: item.card, index: dropResult.index, nextState }))
          } else if (nextState === CardState.Foundation) {
            dispatch(addCardsToFoundation({ movedCard: item.card, index: dropResult.index, nextState }))
          }
        }
        if (item && !dropResult) {
          dispatch(cardIsDragged({ movedCard: item.card, isDragging: false }))
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem()
      }),
      canDrag: () => !card.hidden
    })

    useEffect(() => {
      if (item && item["card"] && isDragging) {
        dispatch(cardIsDragged({ movedCard: item["card"], isDragging }))
      }
    }, [isDragging, item, dispatch])

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: false })
    }, [preview])

    return <Image
      alt={card.id}
      ref={card.hidden ? null : drag}
      userSelect="none"
      src={hidden ? "/cards/back.svg" : `/cards/${id}.svg`}
      display={card.isDragging ? "none" : undefined}
      width="10vw"
      cursor={!hidden ? "grab" : isLastCard && "pointer"}
      position="absolute"
      onClick={hidden ? () => dispatch(turnCard({ index, id })) : undefined}
      onDoubleClick={isLastCard ? (): void => checkDoubleClick(card, nextFoundationCards, dispatch) : undefined}
      onDragStart={event => {
        if (card.hidden) {
          event.preventDefault()
          event.stopPropagation()
        }
      }}
    />
  }
)
