import { Button, ButtonGroup, Divider, Heading, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { BsPersonCircle } from "react-icons/bs"

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selected, setSelected] = useState("login")

  return <>
    <Button variant="ghost" onClick={onOpen}><Icon boxSize="6" as={BsPersonCircle} /></Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Heading>
            <ButtonGroup isAttached variant="outline">
              <Button
                colorScheme={selected === "login" ? "teal" : "gray"}
                onClick={() => setSelected("login")}
              >
                Login
              </Button>
              <Button
                colorScheme={selected === "registration" ? "teal" : "gray"}
                onClick={() => setSelected("registration")}
              >
                Registration
              </Button>
            </ButtonGroup>
          </Heading>
        </ModalHeader>
        <ModalBody>
          {selected === "login" ? <>
            <Input variant="filled" type="name" placeholder="Nickname" />
            <Divider width="0" paddingY="0.5" />
            <Input variant="filled" type="email" placeholder="Email" />
            <Divider width="0" paddingY="0.5" />
            <Input variant="filled" type="password" placeholder="Password" />
          </> : <>
            <Input variant="filled" placeholder="Nickname or Email" />
            <Divider width="0" paddingY="0.5" />
            <Input variant="filled" type="password" placeholder="Password" />
          </>
          }
        </ModalBody>
        <ModalFooter>
          <Button>{selected === "login" ? "Account access" : "Create account"}</Button>
        </ModalFooter>
      </ModalContent >
    </Modal >

  </>
}
