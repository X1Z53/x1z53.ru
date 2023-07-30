import { Box, Button, Center, Icon, Text } from "@chakra-ui/react"
import { Icon24LogoVkOutline } from "@vkontakte/icons"
import Link from "next/link"
import { BiLogoTelegram } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"

export default function Footer() {
  return <Box as="footer">
    <Center flexDirection="column">
      <Text color="gray">Возникла ошибка? Напиши мне</Text>
      <Box>
        <Link target="_blank" href="https://vk.com/x1z53"><Button margin={1}><Icon as={Icon24LogoVkOutline} boxSize={6} /></Button></Link>
        <Link target="_blank" href="https://t.me/x1z53"><Button margin={1}><Icon as={BiLogoTelegram} boxSize={6} /></Button></Link>
        <Link target="_blank" href="mailto:x1z53@yandex.ru"><Button margin={1}><Icon as={HiOutlineMail} boxSize={6} /></Button></Link>
      </Box>
    </Center>
  </Box>
}