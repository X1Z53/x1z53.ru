import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"


export default function Theme() {
  const { toggleColorMode } = useColorMode()
  const iconButton = useColorModeValue(<SunIcon />, <MoonIcon />)
  return <IconButton aria-label="theme" icon={iconButton} onClick={toggleColorMode} />
}