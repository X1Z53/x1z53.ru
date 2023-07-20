import { Button, Icon, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { BsMoon, BsSun } from "react-icons/bs"

export default function ThemeToggleButton() {
  const { toggleColorMode } = useColorMode()
  const iconButton = useColorModeValue(BsSun, BsMoon)
  
  return <Button variant="ghost" onClick={toggleColorMode}><Icon boxSize={6} as={iconButton} /></Button>
}