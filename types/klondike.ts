import { CSSProperties } from "react"

export enum CardColor {
  Red,
  Black
}

export interface PlayingCard {
  id: string
  rank: number
  suit: string
  color: CardColor
  hidden: boolean
  index: number
  type: string
  state: CardState
  isDragging: boolean
}

export enum CardState {
  Stack,
  Deck,
  Foundation
}

export interface PreviewObject {
  itemType: string
  item: {
    type: string
    card: PlayingCard
  }
  style: CSSProperties
}

export interface StackProps {
  width
  cards: PlayingCard[]
  index: number
}

export interface DraggedItem {
  type?: string
  card?: PlayingCard
}

