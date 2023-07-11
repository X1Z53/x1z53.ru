import { Checkbox } from "@chakra-ui/react"
import { useToggle } from "modules/hooks"

export default function CheckBox({ value, text, callback }: { value: boolean, text: string, callback: () => void }) {
  const [selected, toggleSelected] = useToggle(value)
  return <Checkbox
    isChecked={selected}
    onChange={() => {
      toggleSelected()
      callback()
    }}
  >
    {text}
  </Checkbox>
}