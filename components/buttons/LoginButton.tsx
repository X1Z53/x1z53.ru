import { Button, Icon, useDisclosure } from "@chakra-ui/react"
import { Login } from "components/ui"
import { BsPersonCircle } from "react-icons/bs"

export default function LoginButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return <>
    <Button variant="ghost" onClick={onOpen}><Icon boxSize={6} as={BsPersonCircle} /></Button>
    <Login {...{ isOpen, onClose }} />
  </>
}
