import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { BsMoon, BsSun } from "react-icons/bs"

export default function ThemeToggleButton() {
  const { toggleColorMode } = useColorMode()
  const iconButton = useColorModeValue(<BsSun />, <BsMoon />)

  return <IconButton
    variant="ghost"
    onClick={toggleColorMode}
    icon={iconButton}
    aria-label="Изменить тему"
  />
}