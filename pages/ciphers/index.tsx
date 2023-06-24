import CardGrid from "../../components/CardGrid"

export default function CiphersIndexPage() {
  return <CardGrid cards={[
    {
      header: "Шифр Атбаш",
      body: "Простой шифр подстановки для алфавитного письма, не требующий ключа",
      link: "/ciphers/atbash"
    },
    {
      header: "Шифр Виженера",
      body: "Каждый символ иходного текста кодируется шифром Цезаря с использованием разных ключей",
      link: "/ciphers/vigenere"
    },
    {
      header: "Шифр ограждения рельса (зигзагообразный шифр)",
      body: "Является классическим типом транспозиционного шифра, получил название от способа, которым выполняется шифрование",
      link: "/ciphers/railFence"
    },
    {
      header: "Шифр Цезаря",
      body: "Один из самых простых и наиболее широко известных методов шифрования",
      link: "/ciphers/caesar"
    },
  ]} />
}