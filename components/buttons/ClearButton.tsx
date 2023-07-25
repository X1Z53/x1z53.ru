import { Button, Icon, StyleProps } from "@chakra-ui/react"
import { BsTrash } from "react-icons/bs"

export default function Clear({styles, useClear}: {styles?: StyleProps, useClear: () => void}) {
  return <Button {...styles} onClick={useClear}>
    <Icon boxSize={6} as={BsTrash} />
  </Button>
}