// Python prototype (https://github.com/X1Z53/ciphers/blob/main/brief.py)

export default function VigenereCipher(text: string, key: string, alphabet: string, method: string) {
  if (!text || !key || !alphabet) return ""

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
      console.log(vigenereTable, keyIndex, currentChar)
      result += method === "Encrypt"
        ? vigenereTable[keyIndex][textIndex]
        : alphabet[vigenereTable[keyIndex].indexOf(currentChar)]
    } else {
      nonAlphabetCharsCounter++
      result += currentChar
    }
  }

  return result
}