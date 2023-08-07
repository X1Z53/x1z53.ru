import { produce } from "immer"
import { suits } from "modules"
import { RootState } from "store"
import { GameActionTypes, GameActions } from "store/actions"
import { CardState, PlayingCard } from "types"

interface GameState {
  foundations: PlayingCard[][]
  stacks: PlayingCard[][]
  deck: PlayingCard[]
  waste: PlayingCard[]
}

const initialState: GameState = {
  foundations: [[], [], [], []],
  stacks: [],
  deck: [],
  waste: [],
}

export const klondikeReducer = (
  state = initialState,
  action: GameActions,
): GameState => {
  switch (action.type) {
    case GameActionTypes.FoundationAddCards:
      return produce(state, (draft) => {
        draft.foundations[action.payload.index].push({
          ...action.payload.movedCard,
          state: CardState.Foundation,
          index: action.payload.index,
          isDragging: false,
        })

        if (action.payload.movedCard.state === CardState.Deck) {
          draft.waste = draft.waste.filter(
            (card) => card.id !== action.payload.movedCard.id,
          )
        } else {
          draft.stacks[action.payload.movedCard.index] = draft.stacks[
            action.payload.movedCard.index
          ].filter((card) => card.id !== action.payload.movedCard.id)
        }
      })
    case GameActionTypes.StackAddCards:
      return produce(state, (draft) => {
        if (action.payload.movedCard.state === CardState.Stack) {
          const indexOfCard = draft.stacks[
            action.payload.movedCard.index
          ].findIndex((card) => card.id === action.payload.movedCard.id)
          const cardsToAdd = draft.stacks[action.payload.movedCard.index]
            .slice(indexOfCard)
            .map((card) => ({
              ...card,
              index: action.payload.index,
              isDragging: false,
            }))
          const cardsLeft = draft.stacks[action.payload.movedCard.index].slice(
            0,
            indexOfCard,
          )
          draft.stacks[action.payload.index] = [
            ...draft.stacks[action.payload.index],
            ...cardsToAdd,
          ]
          draft.stacks[action.payload.movedCard.index] = cardsLeft
        } else {
          draft.stacks[action.payload.index].push({
            ...action.payload.movedCard,
            state: CardState.Stack,
            index: action.payload.index,
            isDragging: false,
          })

          if (action.payload.movedCard.state === CardState.Deck) {
            draft.waste = draft.waste.filter(
              (card) => card.id !== action.payload.movedCard.id,
            )
          } else {
            draft.foundations[action.payload.movedCard.index] =
              draft.foundations[action.payload.movedCard.index].filter(
                (card) => card.id !== action.payload.movedCard.id,
              )
          }
        }
      })
    case GameActionTypes.TurnCard:
      return produce(state, (draft) => {
        draft.stacks[action.payload.index].map((card, i) => {
          if (
            card.id === action.payload.id &&
            i === draft.stacks[action.payload.index].length - 1
          ) {
            card.hidden = false
            return card
          }
          return card
        })
      })
    case GameActionTypes.DrawCard:
      return produce(state, (draft) => {
        if (draft.deck.length) {
          draft.waste.push(draft.deck.splice(0, 1)[0])
        } else {
          draft.deck = [...draft.waste]
          draft.waste = []
        }
      })
    case GameActionTypes.NewGame:
      return produce(state, (draft) => {
        draft.stacks = action.payload.stacks
        draft.deck = action.payload.deck
        draft.waste = []
        draft.foundations = [[], [], [], []]
      })
    case GameActionTypes.CardIsDragged:
      return produce(state, (draft) => {
        switch (action.payload.movedCard.state) {
          case CardState.Deck:
            draft.waste = draft.waste.map((card) =>
              card.id === action.payload.movedCard.id
                ? { ...card, isDragging: action.payload.isDragging }
                : { ...card },
            )
            break

          case CardState.Foundation:
            draft.foundations[action.payload.movedCard.index] =
              draft.foundations[action.payload.movedCard.index].map((card) =>
                card.id === action.payload.movedCard.id
                  ? { ...card, isDragging: action.payload.isDragging }
                  : { ...card },
              )
            break

          case CardState.Stack:
            draft.stacks[action.payload.movedCard.index] = draft.stacks[
              action.payload.movedCard.index
            ].map((card, index) =>
              index >=
              draft.stacks[action.payload.movedCard.index].findIndex(
                ({ id }) => id === action.payload.movedCard.id,
              )
                ? { ...card, isDragging: action.payload.isDragging }
                : { ...card },
            )
            break
        }
      })
    case GameActionTypes.CardDoubleClicked:
      return produce(state, (draft) => {
        const suitIndex = suits.indexOf(action.payload.doubleClickedCard.suit)

        if (
          draft.foundations[suitIndex].length + 1 ===
          action.payload.doubleClickedCard.rank
        ) {
          draft.foundations[suitIndex].push({
            ...action.payload.doubleClickedCard,
            index: suitIndex,
            state: CardState.Foundation,
          })

          if (action.payload.doubleClickedCard.state === CardState.Stack) {
            draft.stacks[action.payload.doubleClickedCard.index] = draft.stacks[
              action.payload.doubleClickedCard.index
            ].slice(0, -1)
          } else if (
            action.payload.doubleClickedCard.state === CardState.Deck
          ) {
            draft.waste = draft.waste.slice(0, -1)
          }
        }
      })
    default:
      return state
  }
}

export const selectWaste = (state: RootState): PlayingCard[] =>
  state.klondike.present.waste
export const selectDeck = (state: RootState): PlayingCard[] =>
  state.klondike.present.deck
export const selectFoundations = (state: RootState): PlayingCard[][] =>
  state.klondike.present.foundations
export const selectStacks = (state: RootState): PlayingCard[][] =>
  state.klondike.present.stacks
export const selectNextFoundationCards = (state: RootState): string[] =>
  state.klondike.present.foundations.map(
    (foundation, index) => foundation.length + 1 + suits[index],
  )
