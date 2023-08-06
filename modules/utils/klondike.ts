import { CardColor, CardState, PlayingCard } from "types"

export const createTimeString = (gameTime: number): string => {
  const seconds = ("0" + (Math.floor(gameTime / 1000) % 60)).slice(-2)
  const minutes = ("0" + (Math.floor(gameTime / 60000) % 60)).slice(-2)
  const hours = Math.floor(gameTime / 3600000)
    .toString()
    .slice(-2)
  return `${hours}:${minutes}:${seconds}`
}

export const shuffle = <T>(a: T[]): T[] => {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export const suits: string[] = ["heart", "club", "diamond", "spade"]

export const createDeck = (): PlayingCard[] => {
  const deck: PlayingCard[] = []
  for (let i = 1; i < 14; i++) {
    suits.forEach(suit => {
      deck.push({
        rank: i,
        suit,
        color: suit === "heart" || suit === "diamond" ? CardColor.Red : CardColor.Black,
        hidden: false,
        id: suit + i.toString(),
        type: "card",
        index: 0,
        state: CardState.Stack,
        isDragging: false
      })
    })
  }
  return deck
}

export const createNewGame = () => {
  const startDeck = shuffle(createDeck())
  const stacks: PlayingCard[][] = []
  for (let i = 1; i < 8; i++) {
    const tempPiles = startDeck.splice(0, i)
    tempPiles.map((card: PlayingCard, index: number) => {
      card.index = i - 1
      if (index < tempPiles.length - 1) {
        card.hidden = true
        return card
      }
      card.hidden = false
      return card
    })
    stacks.push(tempPiles)
  }
  const deck = startDeck.map(card => ({ ...card, state: CardState.Deck }))
  return { stacks, deck }
}
