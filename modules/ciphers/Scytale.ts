// Python prototype (https://github.com/X1Z53/ciphers/blob/main/brief.py)

export default function Scytale({ text, key, isDecrypt }) {
  if (!parseInt(key)) return "keyError"
  key = Number(key)

  const result = []
  const columns = Math.ceil(text.length / key)

  for (let i = 0; i < (isDecrypt ? key : columns); ++i)
    for (let j = i; j < columns * key; j += (isDecrypt ? key : columns))
      result.push(text[j] || " ")

  return result.join("")
}