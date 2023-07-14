import { HamburgerIcon } from "@chakra-ui/icons"
import { IconButton, useDisclosure } from "@chakra-ui/react"
import { Sidebar } from "components/ui"

export default function SidebarButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return <>
    <IconButton icon={<HamburgerIcon boxSize={6} />} onClick={onOpen} aria-label="Sidebar"/>
    <Sidebar onClose={onClose} isOpen={isOpen} />
  </>
}
