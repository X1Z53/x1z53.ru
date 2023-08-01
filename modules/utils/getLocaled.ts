import { LocaleContext } from "pages/_app"
import { useContext } from "react"

export default function getLocaled(object: { [key: string]: any}) {
  return object[useContext(LocaleContext)]
}