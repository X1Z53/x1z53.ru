import { IconButton, StyleProps, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { BsFillClipboard2Fill } from "react-icons/bs"

type CopyButtonProps = {
  styles?: StyleProps,
  value: string
}

export default function CopyButton({ styles, value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  return <Tooltip
    onClose={() => { setCopied(false) }}
    closeOnClick={false}
    hasArrow
    color="white"
    label={copied ? "Текст скопирован" : "Нажмите, чтобы скопировать"}
  >
    <IconButton
      {...styles}
      onClick={() => {
        setCopied(true)
        navigator.clipboard.writeText(value)
      }}
      icon={<BsFillClipboard2Fill />}
      aria-label="Скопировать"
    />
  </Tooltip>
}