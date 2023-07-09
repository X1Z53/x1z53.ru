import { Button, Icon, StyleProps, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { BsFillClipboard2Fill } from "react-icons/bs"

export default function Copy({ styles, value }: { styles?: StyleProps, value: string }) {
  const [copied, setCopied] = useState(0)
  return <Tooltip
    closeOnClick={false} hasArrow backgroundColor="gray.700" color="white"
    label={copied ? "Text in your clipboard" : "Click for copy"}

  >
    <Button onClick={() => {
      setCopied(1)
      navigator.clipboard.writeText(value)
    }} {...styles}>
      <Icon as={BsFillClipboard2Fill} />
    </Button>
  </Tooltip>
}