import { Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Show, Text } from "@chakra-ui/react"
import { pages as database } from "databases"
import { getLocaled, getLocaledTitles } from "modules"
import Link from "next/link"
import { SidebarProps } from "types"
import Controls from "./Controls"

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const titles = getLocaledTitles()
  const pages = getLocaled(database)

  return <Drawer {...{ isOpen, onClose }} placement="left">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>
        <Flex justifyContent="space-around">
          <Show below="md"><Controls /></Show>
          <DrawerCloseButton />
        </Flex>
      </DrawerHeader>
      <DrawerHeader>
        <Center>
          <Heading size="md">{titles.navigation}</Heading>
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
          <Button variant="ghost">{titles.about}</Button>
        </Link>
        <Text>{titles.createdBy}</Text>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
}