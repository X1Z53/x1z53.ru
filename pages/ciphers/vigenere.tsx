import { CipherPageGenerator } from "components"

export default function Cipher() {
  return (
    <CipherPageGenerator name="vigenere" haveAlphabet haveDecrypt haveKey />
  )
}
