export default function morse(text, encrypt, alphabet) {
  const [first, second] = encrypt ? ["char", "morse"] : ["morse", "char"]
  
  return text.map(
    symbol => alphabet.map(char => char[first]).includes(symbol.toUpperCase())
      ? alphabet.find(char => char[first] === symbol.toUpperCase())[second]
      : symbol
  )
}