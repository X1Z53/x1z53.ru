// Python prototype (https://github.com/X1Z53/ciphers/blob/main/brief.py)

export default function RailFence({ text, key, isDecrypt, setKey }) {
  if (!parseInt(key)) {
    setKey("3")
    key = 3
  }
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

  const result = []
  if (isDecrypt) for (const [textIndex, resultIndex] of rails.entries()) result[resultIndex] = text[textIndex]
  else rails.map(index => result.push(text[index]))

  return result.join("")
}
