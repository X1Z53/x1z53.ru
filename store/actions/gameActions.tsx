import { CardState, PlayingCard } from "types"

export enum GameActionTypes {
  FoundationAddCards = "game/AddToFoundationCards",
  StackAddCards = "game/AddToStackCards",
  TurnCard = "game/TurnCard",
  DrawCard = "game/DrawCard",
  NewGame = "game/NewGame",
  CardIsDragged = "game/CardIsDragged",
  CardDoubleClicked = "game/HandleDoubleClick",
  UndoMove = "game/UndoMove",
}

type CardsPayload = {
  movedCard: PlayingCard
  index: number
  nextState: CardState
}

type CardDoubleClickedPayload = {
  doubleClickedCard: PlayingCard
}

type CardDragPayload = {
  movedCard: PlayingCard
  isDragging: boolean
}

type TurnCardPayload = {
  index: number
  id: string
}

export type NewGamePayload = {
  stacks: PlayingCard[][]
  deck: PlayingCard[]
}

type AddCardsToFoundation = {
  readonly type: GameActionTypes.FoundationAddCards
  readonly payload: CardsPayload
}

type AddCardsToStack = {
  readonly type: GameActionTypes.StackAddCards
  readonly payload: CardsPayload
}

export type TurnCard = {
  readonly type: GameActionTypes.TurnCard
  readonly payload: TurnCardPayload
}

export type DrawCard = {
  readonly type: GameActionTypes.DrawCard
}

export type UndoMove = {
  readonly type: GameActionTypes.UndoMove
}

export type StartNewGame = {
  readonly type: GameActionTypes.NewGame
  readonly payload: NewGamePayload
}

type CardIsDragged = {
  readonly type: GameActionTypes.CardIsDragged
  readonly payload: CardDragPayload
}

export type CardDoubleClicked = {
  readonly type: GameActionTypes.CardDoubleClicked
  readonly payload: CardDoubleClickedPayload
}

export const addCardsToFoundation = (
  payload: CardsPayload,
): AddCardsToFoundation => ({
  type: GameActionTypes.FoundationAddCards,
  payload,
})

export const addCardsToStack = (payload: CardsPayload): AddCardsToStack => ({
  type: GameActionTypes.StackAddCards,
  payload,
})

export const turnCard = (payload: TurnCardPayload): TurnCard => ({
  type: GameActionTypes.TurnCard,
  payload,
})

export const drawCard = (): DrawCard => ({ type: GameActionTypes.DrawCard })

export const startNewGame = (payload: NewGamePayload): StartNewGame => ({
  type: GameActionTypes.NewGame,
  payload,
})

export const cardIsDragged = (payload: CardDragPayload): CardIsDragged => ({
  type: GameActionTypes.CardIsDragged,
  payload,
})

export const handleDoubleClick = (
  payload: CardDoubleClickedPayload,
): CardDoubleClicked => ({
  type: GameActionTypes.CardDoubleClicked,
  payload,
})

export const undoMove = (): UndoMove => ({ type: GameActionTypes.UndoMove })

export type GameActions =
  | AddCardsToFoundation
  | AddCardsToStack
  | TurnCard
  | DrawCard
  | StartNewGame
  | CardIsDragged
  | CardDoubleClicked
  | UndoMove
