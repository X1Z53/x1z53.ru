import { IconButton, useDisclosure } from "@chakra-ui/react"
import { Login } from "components"
import { BsPersonCircle } from "react-icons/bs"

export default function LoginButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        variant="ghost"
        onClick={onOpen}
        icon={<BsPersonCircle />}
        aria-label="Вход или Регистрация"
      />
      <Login {...{ isOpen, onClose }} />
    </>
  )
}
