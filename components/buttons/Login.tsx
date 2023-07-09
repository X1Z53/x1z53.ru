import { Button, Heading, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { BsPersonCircle } from "react-icons/bs"
import { ToggleButtonGroup } from "components/buttons"

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selected, setSelected] = useState("Registration")

  return <>
    <Button variant="ghost" onClick={onOpen}><Icon boxSize="6" as={BsPersonCircle} /></Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Heading>
            <ToggleButtonGroup buttons={["Registration", "Login"]} callback={setSelected} />
          </Heading>
        </ModalHeader>
        <ModalBody>
          {
            selected === "Registration" ? <>
              <Input variant="filled" type="name" placeholder="Nickname" marginBottom="1" />
              <Input variant="filled" type="email" placeholder="Email" marginBottom="1" />
              <Input variant="filled" type="password" placeholder="Password" />
            </> : <>
              <Input variant="filled" placeholder="Nickname or Email" marginBottom="1" />
              <Input variant="filled" type="password" placeholder="Password" />
            </>
          }
        </ModalBody>
        <ModalFooter>
          <Button>{selected === "Registration" ? "Account access" : "Create account"}</Button>
        </ModalFooter>
      </ModalContent >
    </Modal >

  </>
}
