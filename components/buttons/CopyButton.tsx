import { IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { BsFillClipboard2Fill } from "react-icons/bs"
import { CopyButtonProps } from "types"

export default function CopyButton({ styles, value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const backgroundColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Tooltip
      {...{ backgroundColor }}
      onClose={() => {
        setCopied(false)
      }}
      closeOnClick={false}
      hasArrow
      color="chakra-body-text"
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
  )
}
