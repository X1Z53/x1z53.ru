import { Checkbox, Flex } from "@chakra-ui/react"
import { useToggle } from "modules/hooks"

export default function CheckBox({ title, value, callback }: { title: string, value: boolean, callback: () => void }) {
  const [selected, toggleSelected] = useToggle(value)
  return <Flex>
    <Checkbox
      isChecked={selected}
      colorScheme="gray"
      onChange={() => {
        toggleSelected()
        callback()
      }}
    >
      {title}
    </Checkbox>
  </Flex>
}