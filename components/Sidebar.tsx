import { HamburgerIcon } from "@chakra-ui/icons"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, IconButton, useDisclosure } from "@chakra-ui/react"
import Link from "next/link"
import Theme from "./Theme"


export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return <>
    <IconButton icon={<HamburgerIcon />} onClick={onOpen} aria-label="Drawer" />
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader><Theme /></DrawerHeader>
        <DrawerBody>
          <Flex direction="column" justifyContent="center">
            <Link href="/idk"><Button width="100%" variant="ghost">Somthink intresting</Button></Link>
            <Link href="/about"><Button width="100%" variant="ghost">About</Button></Link>
          </Flex>
        </DrawerBody>
        <DrawerFooter>Designed by X1Z53</DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
}
