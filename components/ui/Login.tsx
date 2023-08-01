import { Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { ToggleButtonGroup } from "components"
import { useState } from "react"
import { LoginProps } from "types"

export default function Login({ isOpen, onClose }: LoginProps) {
  const [selected, setSelected] = useState("Registration")

  return <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader textAlign="center">
        <Text color="red">В разработке</Text>
        <Heading>
          <ToggleButtonGroup buttons={["Registration", "Login"]} onChange={setSelected} />
        </Heading>
      </ModalHeader>
      <ModalBody>
        {
          selected === "Registration" ? <>
            <Input variant="filled" type="name" placeholder="Имя пользователя" marginBottom={1} />
            <Input variant="filled" type="email" placeholder="Email" marginBottom={1} />
            <Input variant="filled" type="password" placeholder="Пароль" />
          </> : <>
            <Input variant="filled" placeholder="Имя пользователя или Email" marginBottom={1} />
            <Input variant="filled" type="password" placeholder="Пароль" />
          </>
        }
      </ModalBody>
      <ModalFooter>
        <Button>{selected === "Registration" ? "Account access" : "Create account"}</Button>
      </ModalFooter>
    </ModalContent >
  </Modal >
}