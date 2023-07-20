import { Checkbox, Flex } from "@chakra-ui/react"
import { useToggle } from "features/hooks"

type CheckBoxProps = {
  title: string,
  value: boolean,
  onChange: (any) => void
}

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