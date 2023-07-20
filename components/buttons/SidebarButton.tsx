import { Button, Icon, useDisclosure } from "@chakra-ui/react"
import { Sidebar } from "components/ui"
import { BsList } from "react-icons/bs"

export default function SidebarButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return <>
    <Button variant="ghost" onClick={onOpen}><Icon boxSize={6} as={BsList} /></Button>
    <Sidebar {...{ isOpen, onClose }} />
  </>
}
