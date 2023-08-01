export default function RailFence({ text, key, isDecrypt }) {
  key = Number(key)

  const rails = []
  for (let counter = 0; counter < key; counter++) {
    let value = counter
    let direction = counter

    while (value < text.length) {
      rails.push(value)
      value += 2 * (key - 1 - (key === direction + 1 ? 0 : direction))
      direction = key - 1 - direction
    }
  }

  if (!isDecrypt) return rails.map(index => text[index]).join("")

  const result = []
  for (const [textIndex, resultIndex] of rails.entries())
    result[resultIndex] = text[textIndex]

  return result.join("")
}
