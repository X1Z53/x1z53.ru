import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex } from "@chakra-ui/react"
import { ThemeToggleButton } from "components/buttons"
import { getDatabase } from "modules/hooks"
import Link from "next/link"

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const pages = getDatabase("pages").sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  )

  return <Drawer isOpen={isOpen} onClose={onClose} placement="left">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader><ThemeToggleButton /></DrawerHeader>
      <DrawerBody>
        <Flex direction="column" align="center">
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
        Designed by X1Z53
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
}