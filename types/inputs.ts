import { StyleProps } from "@chakra-ui/react"

export type CheckBoxProps = {
  title: string
  value: boolean
  onChange: (any) => void
}
export type ToggleButtonGroupProps = {
  buttons: string[] | React.ReactElement[]
  onChange: (any: string) => void
  noSelect?: boolean
  noAdaptive?: boolean
}

export type InputFieldProps = {
  type: string
  value?: string
  onChange?: (any) => void
  title?: string
  inGroup?: boolean
  readOnly?: boolean
  colorPickerButton?: boolean
  copyButton?: boolean
  clearButton?: boolean
  isFirst?: boolean
  isLast?: boolean
  styles?: StyleProps
  minHeight?: string
} & (
  | TextProps
  | NumberProps
  | SelectProps
  | DropzoneProps
  | InputFieldGroupProps
)

type TextProps = {
  type: "text"
  value: string
  alphabet?: string
  includedInAlphabet?: boolean
}
type NumberProps = {
  type: "number"
  value: string
  min?: number
  max?: number
  step?: number
}
type SelectProps = {
  type: "select"
  value: string
  options?: string[] | object[]
}
type DropzoneProps = {
  type: "dropzone"
  onLoad?: (any: ProgressEvent<FileReader>) => void
  readAs?: string
  accept?: { [key: string]: string[] }
  fileNames?: string[]
  setFileNames?: (any: string[]) => void
  useClear?: () => void
}
type InputFieldGroupProps = {
  type: "group"
  children: React.ReactElement[]
}
