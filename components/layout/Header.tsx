import { Box, Center, Container, Flex, Image, Show, useColorModeValue } from "@chakra-ui/react"
import { LoginButton, SidebarButton } from "components/buttons"
import { BreadCrumbs } from "components/layout"
import Link from "next/link"

export default function Header({ path, title }: { path: string[], title: string[] }) {
  const background = useColorModeValue("gray.100", "gray.700")
  const filter = useColorModeValue("invert(100%)", "")

  return <Box as="header" paddingY={2} backgroundColor={background}>
    <Container maxWidth="container.xl" position="relative">
      <Flex position="absolute" gap={4} left={4} top={1} right="55%">
        <SidebarButton />
        <Show above="md"><BreadCrumbs {...{ path, title }} /></Show>
      </Flex>
      <Flex position="absolute" gap={4} right={4} top={1} left="55%" justifyContent="right">
        <LoginButton />
      </Flex>
      <Center flexGrow={1}>
        <Link href="/">
          <Image filter={filter} src="https://images.x1z53.ru/x1z53.svg" alt="X1Z53" boxSize={50} objectFit="cover" />
        </Link>
      </Center>
    </Container>
  </Box>
}