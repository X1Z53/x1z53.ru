import { Heading } from "@chakra-ui/react"
import { CardGrid } from "components"

export default function About() {
  const developer = [
    {
      name: "vk",
      title: "ВКонтакте",
      description: "",
      url: "https://vk.com/x1z53"
    },
    {
      name: "telegram",
      title: "Telegram",
      description: "",
      url: "https://t.me/x1z53"
    },
    {
      name: "github",
      title: "GitHub",
      description: "",
      url: "https://github.com/x1z53"
    },
  ]
  const site = [
    {
      name: "github",
      title: "Репозиторий проекта",
      description: "",
      url: "https://github.com/x1z53/x1z53.ru"
    },
    {
      name: "mainDomain",
      title: "Основной домен",
      description: "",
      url: "https://x1z53.ru"
    },
    {
      name: "testSubdomain",
      title: "Субдомен для тестирования",
      description: "",
      url: "https://test.x1z53.ru"
    },
    {
      name: "imageSubdomain",
      title: "Субдомен для изображений",
      description: "",
      url: "https://images.x1z53.ru"
    },
  ]

  return <>
    <Heading>О сайте</Heading>
    Разработчик
    <CardGrid isExternal cards={developer} cardWidth="200px" />
    Сайт
    <CardGrid isExternal cards={site} cardWidth="200px" />    
  </>
}