import { HamburgerIcon } from "@chakra-ui/icons"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, IconButton, useDisclosure } from "@chakra-ui/react"
import { Theme } from "components/buttons"
import Link from "next/link"


export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return <>
    <IconButton icon={<HamburgerIcon />} onClick={onOpen} aria-label="Drawer" />
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader><Theme /></DrawerHeader>
        <DrawerBody>
          <Flex direction="column" align="center">
            <Link href="/ciphers" onClick={onClose}>
              <Button variant="ghost">Ciphers</Button>
            </Link>
            <Link href="/converter" onClick={onClose}>
              <Button variant="ghost">Converter</Button>
            </Link>
          </Flex>
        </DrawerBody>
        <DrawerFooter>Designed by X1Z53</DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
}
