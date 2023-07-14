import { Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { InputField } from "components/form"
import { getDatabase } from "features/hooks"
import ky from "ky"
import { useEffect, useState } from "react"

export default function UrlShorter() {
  const [text, setText] = useState("x1z53.ru")
  const [result, setResult] = useState("")

  useEffect(() => {
    ky(`https://clck.ru/--?url=${text}`).text()
      .then(result => { setResult(result) })
      .catch(error => { console.error(error) })
  }, [text])

  const { data, isLoading } = getDatabase("generators")
  if (isLoading) return <Spinner />
  const { title, description } = data.find(({ name }) => name === "urlShorter")

  return <>
    <Heading>{title}</Heading>
    <Text paddingBottom={4}>{description}</Text>
    <SimpleGrid columns={[1, 1, 2]} spacing={4}>
      <InputField type="text" title="Текст" value={text} callback={setText} />
      <InputField type="text" title="Результат" copyButton readOnly value={result} callback={setResult} />
    </SimpleGrid>
  </>
}