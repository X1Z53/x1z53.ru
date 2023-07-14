import { Checkbox, Flex } from "@chakra-ui/react"
import { useToggle } from "features/hooks"

type CheckBoxProps = {
  title: string,
  value: boolean,
  callback: (any) => void
}

export default function CheckBox({ title, value, callback }: CheckBoxProps) {
  const [selected, toggleSelected] = useToggle(value)
  return <Flex>
    <Checkbox
      isChecked={selected}
      colorScheme="gray"
      onChange={() => {
        toggleSelected()
        callback(!selected)
      }}
    >
      {title}
    </Checkbox>
  </Flex>
}