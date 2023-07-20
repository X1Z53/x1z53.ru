// Python prototype (https://github.com/X1Z53/ciphers/blob/main/brief.py)

export default function Atbash({text, alphabet}) {
  if (!text || !alphabet) return ""

  const lower = alphabet.toLowerCase()
  const upper = alphabet.toUpperCase()
  alphabet = lower + upper
  const shiftedAlphabet = lower.split("").reverse().join("") + upper.split("").reverse().join("")

  return text.split("").map(char => alphabet.includes(char) ? shiftedAlphabet[alphabet.indexOf(char)] : char).join("")
}
