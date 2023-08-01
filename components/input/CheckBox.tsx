import { Checkbox, Flex } from "@chakra-ui/react"
import { useToggle } from "modules"
import { CheckBoxProps } from "types"

export default function CheckBox({ title, value, onChange }: CheckBoxProps) {
  const [selected, toggleSelected] = useToggle(value)
  return <Flex>
    <Checkbox
      isChecked={selected}
      colorScheme="gray"
      onChange={() => {
        toggleSelected()
        onChange(!selected)
      }}
    >
      {title}
    </Checkbox>
  </Flex>
}