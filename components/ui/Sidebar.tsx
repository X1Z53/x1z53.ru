import { Button, Center, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Show, Text } from "@chakra-ui/react"
import { pages as database } from "databases"
import { getLocaled } from "modules"
import Link from "next/link"
import { SidebarProps } from "types"
import Controls from "./Controls"

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { navigationTitle, designTitle, aboutTitle } = getLocaled({
    ru: { navigationTitle: "Навигация", designTitle: "Дизайн X1Z53", aboutTitle: "О сайте" },
    en: { navigationTitle: "Navigation", designTitle: "Designed by X1Z53", aboutTitle: "About" }
  })
  const pages = getLocaled(database)

  return <Drawer {...{ isOpen, onClose }} placement="left">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>
        <Flex justifyContent="space-between">
          <Show below="md"><Controls /></Show>
        </Flex>
      </DrawerHeader>
      <DrawerHeader>
        <Center>
          <Heading size="md">{navigationTitle}</Heading>
        </Center>
      </DrawerHeader>
      <DrawerBody>
        <Center flexDirection="column">
          {
            pages.map(({ name, title }) =>
              name !== "about" &&
              <Link key={name} href={"/" + name} onClick={onClose}>
                <Button fontWeight="normal" variant="ghost">{title}</Button>
              </Link>
            )
          }
        </Center>
      </DrawerBody>
      <DrawerFooter justifyContent="space-between">
        <Link href={"/about"} onClick={onClose}>
          <Button variant="ghost">{aboutTitle}</Button>
        </Link>
        <Text>{designTitle}</Text>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
}