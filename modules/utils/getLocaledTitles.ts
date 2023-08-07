import { titles } from "databases"
import { getReduced, getLocaled } from "modules"

export default function getLocaledTitles() {
  return getReduced(
    getLocaled(titles).map(({ name, title }) => ({ [name]: title })),
  )
}
