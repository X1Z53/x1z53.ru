import { Box, Container, Flex, Image, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"
import Login from "./Login"
import Sidebar from "./Sidebar"

export default function Header() {
  const filter = useColorModeValue("", "invert(1)")
  const background = useColorModeValue("gray.100", "gray.700")

  return <Box as="header" paddingY="2" backgroundColor={background}>
    <Container maxWidth="container.lg">
      <Flex justifyContent="space-between" alignItems="center">
        <Sidebar />
        <Link href="/">
          <Image filter={filter} src="https://images.x1z53.ru/x1z53.svg" alt="X1Z53" boxSize="50" objectFit="cover" />
        </Link>
        <Login />
      </Flex>
    </Container>
  </Box>
}