import { IconButton } from "@chakra-ui/react"
import { BsTrash } from "react-icons/bs"
import { ClearButtonProps } from "types"

export default function ClearButton({ styles, useClear }: ClearButtonProps) {
  return <IconButton {...styles} onClick={useClear} icon={<BsTrash />} aria-label="Очистить" />
}