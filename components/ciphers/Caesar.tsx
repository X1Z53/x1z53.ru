// Python prototype (https://github.com/X1Z53/ciphers/blob/main/brief.py)

export default function Caesar(text: string, key: string | number, alphabet: string, method: string): string {
  if (!text || !key || !alphabet) return ""
  key = method ==="Encrypt" ? Number(key) : -Number(key)
  const lower = alphabet.toLowerCase()
  const upper = alphabet.toUpperCase()
  alphabet = lower + upper
  const shiftedAlphabet = lower.slice(key) + lower.slice(0, key) + upper.slice(key) + upper.slice(0, key)
  return text.split("").map(char => alphabet.includes(char) ? shiftedAlphabet[alphabet.indexOf(char)] : char).join("")
}
