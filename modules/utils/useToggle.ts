import { useState } from "react"

export default function useToggle(
  initialValue: boolean,
): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)
  return [
    value,
    () => {
      setValue(!value)
    },
  ]
}
