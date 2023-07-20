import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Text } from "@chakra-ui/react"
import { ThemeToggleButton } from "components/buttons"
import { ModalProps } from "components/ui"
import { pages } from "databases"
import Link from "next/link"

export default function Sidebar({ isOpen, onClose }: ModalProps) {
  return <Drawer {...{ isOpen, onClose }} placement="left">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>
        <ThemeToggleButton />
      </DrawerHeader>
      <DrawerBody>
        <Flex direction="column" alignItems="center">
          {pages.map(({ name, title }) =>
            <Link key={name} href={"/" + name} onClick={onClose}>
              <Button variant="ghost">{title}</Button>
            </Link>
          )}
        </Flex>
      </DrawerBody>
      <DrawerFooter justifyContent="space-between">
        <Link href={"/about"} onClick={onClose}>
          <Button variant="ghost">О сайте</Button>
        </Link>
        <Text>Designed by X1Z53</Text>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
}