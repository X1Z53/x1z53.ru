import { IconButton, useDisclosure } from "@chakra-ui/react"
import { Sidebar } from "components"
import { BsList } from "react-icons/bs"

export default function SidebarButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return <>
    <IconButton variant="ghost" onClick={onOpen} icon={<BsList />} aria-label="Боковое меню" />
    <Sidebar {...{ isOpen, onClose }} />
  </>
}
