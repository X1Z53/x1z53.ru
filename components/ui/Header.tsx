import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  Show,
  useColorModeValue,
} from "@chakra-ui/react"
import { BreadCrumbs, Controls, Head, SidebarButton } from "components"
import * as databases from "databases/pages"
import {
  getDatabaseObject,
  getLocaled,
  getLocaledTitles,
  getReduced,
} from "modules"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Header() {
  const pages = getReduced(
    Object.keys(databases).map((database) => ({
      [database]: getLocaled(databases[database]),
    })),
  )
  const path = useRouter().asPath.split("/").slice(1)
  const titles = Object.values(pages)
    .map((page) => page.map(({ name, title }) => ({ name, title })))
    .flat()
  const title = path[0]
    ? path
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .map(
          (pathPart) =>
            getDatabaseObject(
              titles,
              pathPart[0]?.toLowerCase() + pathPart.slice(1),
            )?.title || pathPart,
        )
    : [getLocaledTitles().mainPage]

  const background = useColorModeValue("gray.100", "gray.700")
  const filter = useColorModeValue("invert(100%)", "")

  return (
    <Box as="header" paddingY={2} backgroundColor={background}>
      <Head title={title.join(" > ")} />
      <Container maxWidth="container.xl" position="relative">
        <Flex position="absolute" gap={4} left={4} top={1} right="55%">
          <SidebarButton />
          <Show above="md">
            <BreadCrumbs {...{ title, path }} />
          </Show>
        </Flex>
        <Flex
          position="absolute"
          gap={4}
          right={4}
          top={1}
          left="55%"
          justifyContent="right"
        >
          <Show above="md">
            <Controls />
          </Show>
          {/* <LoginButton /> */}
        </Flex>
        <Center flexGrow={1}>
          <Link href="/">
            <Image
              filter={filter}
              src="/x1z53.svg"
              alt="X1Z53"
              boxSize={50}
              objectFit="cover"
            />
          </Link>
        </Center>
      </Container>
    </Box>
  )
}
