// Python prototype (https://github.com/X1Z53/ciphers/blob/main/brief.py)

export default function Scytale({ text, key, isDecrypt }) {
  if (!parseInt(key)) return "keyError"
  key = Number(key)
  const matrix = Array.from(Array(key), () => [])

  let row = 0
  for (let i = 0; i < text.length; i++) {
    matrix[row].push(text[i])
    row = (row + 1) % key
  }

  return isDecrypt ? "Work in progress" : matrix.flat().join("")
}

