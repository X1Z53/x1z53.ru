export default function Caesar({text, alphabet, key, isDecrypt}) {
  key = Number(key)

  key = !isDecrypt ? key : -key

  const lower = alphabet.toLowerCase()
  const upper = alphabet.toUpperCase()
  alphabet = lower + upper
  const shiftedAlphabet = lower.slice(key) + lower.slice(0, key) + upper.slice(key) + upper.slice(0, key)

  return text.split("").map(char => alphabet.includes(char) ? shiftedAlphabet[alphabet.indexOf(char)] : char).join("")
}
