import { Button, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { BsArrowLeft } from "react-icons/bs"

export default function BackButton() {
  const router = useRouter()
  return router.asPath !== "/" && <Button variant="ghost" onClick={() => { router.back() }}>
    <Icon boxSize={6} as={BsArrowLeft} />
  </Button>
}