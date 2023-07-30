import { Box, Center, IconButton, Text } from "@chakra-ui/react"
import { Icon24LogoVkOutline } from "@vkontakte/icons"
import Link from "next/link"
import { BiLogoTelegram } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"

export default function Footer() {
  return <Box as="footer">
    <Center flexDirection="column">
      <Text>Возникла ошибка? Напиши мне</Text>
      <Box>
        <Link target="_blank" href="https://vk.com/x1z53"><IconButton margin={1} icon={<Icon24LogoVkOutline />} aria-label="ВКонтакте" /></Link>
        <Link target="_blank" href="https://t.me/x1z53"><IconButton margin={1} icon={<BiLogoTelegram />} aria-label="Telegram" /></Link>
        <Link target="_blank" href="mailto:x1z53@yandex.ru"><IconButton margin={1} icon={<HiOutlineMail />} aria-label="Почта" /></Link>
      </Box>
    </Center>
  </Box>
}