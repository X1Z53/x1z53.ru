export default function Vigenere({text, key, alphabet, isDecrypt}) {
  if (!text || !key || typeof key !== "string" || !alphabet) return ""
  const lower = alphabet.toLowerCase()
  const upper = alphabet.toUpperCase()
  alphabet = lower + upper

  const vigenereTable: string[] = Array.from(Array(lower.length).keys())
    .map(i => lower.slice(i) + lower.slice(0, i) + upper.slice(i) + upper.slice(0, i))
  const normalizedKey = Array.from(Array(text.replace(" ", "").length).keys())
    .map((_, i) => key[i % key.length]).join("")

  let result = ""
  let nonAlphabetCharsCounter = 0

  for (let i = 0; i < text.length; i++) {
    const currentChar = text[i]

    if (alphabet.includes(currentChar)) {
      const keyIndex = lower.indexOf(normalizedKey[i - nonAlphabetCharsCounter])
      const textIndex = alphabet.indexOf(currentChar)
      result += isDecrypt
        ? alphabet[vigenereTable[keyIndex].indexOf(currentChar)]
        : vigenereTable[keyIndex][textIndex]
    } else {
      nonAlphabetCharsCounter++
      result += currentChar
    }
  }

  return result
}