import { IconButton, StyleProps } from "@chakra-ui/react"
import { BsTrash } from "react-icons/bs"

export default function Clear({styles, useClear}: {styles?: StyleProps, useClear: () => void}) {
  return <IconButton {...styles} onClick={useClear} icon={<BsTrash />} aria-label="Очистить" />
}