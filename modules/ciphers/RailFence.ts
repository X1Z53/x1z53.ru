// Python prototype (https://github.com/X1Z53/ciphers/blob/main/brief.py)

export default function RailFence({ text, key, isDecrypt }) {
  if (!parseInt(key)) return "keyError"
  key = Number(key)
  const matrix = Array.from({length: key}, () => [])
  let moveDown = false
  let row = 0

  text.split("").map(letter => {
    if ([0, key - 1].includes(row)) moveDown = !moveDown
    matrix[row].push(letter)
    row += moveDown ? 1 : -1
  })

  return isDecrypt ? "Work in progress" : matrix.flat().join("")
}
