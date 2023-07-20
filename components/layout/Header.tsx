import { Box, Center, Container, Flex, Image, useColorModeValue } from "@chakra-ui/react"
import { LoginButton, SidebarButton } from "components/buttons"
import BackButton from "components/buttons/BackButton"
import Link from "next/link"

export default function Header() {
  const background = useColorModeValue("gray.100", "gray.700")

  return <Box as="header" paddingY="2" backgroundColor={background}>
    <Container maxWidth="container.xl" position="relative">
      <Flex position="absolute" left="4" top="1">
        <SidebarButton />
        <BackButton />
      </Flex>
      <Flex position="absolute" right="4" top="1">
        <LoginButton />
      </Flex>
      <Center flexGrow="1">
        <Link href="/">
          <Image src="https://images.x1z53.ru/x1z53.svg" alt="X1Z53" boxSize="50" objectFit="cover" />
        </Link>
      </Center>
    </Container>
  </Box>
}