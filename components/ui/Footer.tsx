import { Box, Center, IconButton, Text } from "@chakra-ui/react"
import { Icon24LogoVkOutline } from "@vkontakte/icons"
import { about as database } from "databases"
import { getLocaled, getLocaledTitles } from "modules"
import Link from "next/link"
import { BiLogoGithub, BiLogoTelegram } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"

export default function Footer() {
  const about = getLocaled(database)
  const { footer } = getLocaledTitles()

  const icons = {
    vk: <Icon24LogoVkOutline />,
    telegram: <BiLogoTelegram />,
    email: <HiOutlineMail />,
    github: <BiLogoGithub />,
  }

  return (
    <Box as="footer">
      <Center flexDirection="column">
        <Text userSelect="none">{footer}</Text>
        <Box>
          {about.map(
            ({ category, name, title, url }) =>
              category === "developer" && (
                <Link key={name} target="_blank" href={url}>
                  <IconButton
                    margin={1}
                    icon={icons[name]}
                    aria-label={title}
                  />
                </Link>
              ),
          )}
        </Box>
      </Center>
    </Box>
  )
}
