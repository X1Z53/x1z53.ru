import { LocaleContext } from "pages/_app"
import { useContext } from "react"

export default function getLocaled(object: { ru, en }) {
  return object[useContext(LocaleContext)]
}