import { StyleProps } from "@chakra-ui/react"

export type ClearButtonProps = {
  styles?: StyleProps,
  useClear: () => void
}
export type ColorPickerButtonProps = {
  styles?: StyleProps,
  value: string,
  onChange: (any) => void
}
export type CopyButtonProps = {
  styles?: StyleProps,
  value: string
}
