import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Spinner } from "@chakra-ui/react"
import { ThemeToggleButton } from "components/buttons"
import { ModalProps } from "components/ui"
import { getDatabase } from "features/hooks"
import Link from "next/link"

export default function Sidebar({ isOpen, onClose }: ModalProps) {
  const { data: pages, isLoading } = getDatabase("pages")

  return <Drawer isOpen={isOpen} onClose={onClose} placement="left">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader><ThemeToggleButton /></DrawerHeader>
      <DrawerBody>
        <Flex direction="column" align="center">
          {isLoading ? <Spinner /> : pages.map(({ name, title }) =>
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
        Designed by X1Z53
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
}