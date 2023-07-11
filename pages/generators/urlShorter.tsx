import { SimpleGrid } from "@chakra-ui/react"
import { InputField } from "components/form"
import ky from "ky"
import { useEffect, useState } from "react"

export default function UrlShorter() {
  const [text, setText] = useState("https://x1z53.ru")
  const [result, setResult] = useState("") 

  useEffect(() => {
    ky(`https://clck.ru/--?url=${text}`).text()
      .then(res => { setResult(res) })
      .catch(err => { console.error(err) })
  }, [text])

  return <SimpleGrid columns={[1, 1, 2]} spacing={4}>
    <InputField title="Текст" type="text" value={text} callback={setText} />
    <InputField copyButton readOnly title="Результат" type="text" value={result} callback={setResult} />
  </SimpleGrid>
}