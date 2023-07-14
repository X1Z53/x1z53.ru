import { Button, Icon, StyleProps, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { BsFillClipboard2Fill } from "react-icons/bs"

type CopyButtonProps = {
  styles?: StyleProps,
  value: string
}

export default function CopyButton({ styles, value }: CopyButtonProps) {
  const [copied, setCopied] = useState(0)
  return <Tooltip
    closeOnClick={false} hasArrow backgroundColor="gray.700" color="white"
    label={copied ? "Text in your clipboard" : "Click for copy"}
  >
    <Button onClick={() => {
      setCopied(1)
      navigator.clipboard.writeText(value)
    }} {...styles}>
      <Icon boxSize={6} as={BsFillClipboard2Fill} />
    </Button>
  </Tooltip>
}