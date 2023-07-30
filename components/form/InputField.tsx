import { Flex, Input, InputGroup, InputLeftAddon, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, StyleProps, Textarea } from "@chakra-ui/react"
import { Clear, ColorPicker, Copy } from "components/buttons"
import { useEffect, useRef, useState } from "react"
import Dropzone from "react-dropzone"

type TextProps = {
  type: "text"
  alphabet?: string
  includedInAlphabet?: boolean
}

type NumberProps = {
  type: "number"
  min?: number
  max?: number
  step?: number
}

type SelectProps = {
  type: "select"
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

type InputFieldProps = {
  title: string
  value: string
  onChange?: (any) => void
  readOnly?: boolean
  colorPickerButton?: boolean
  copyButton?: boolean
  clearButton?: boolean
  styles?: StyleProps
  minHeight?: string
} & (TextProps | NumberProps | SelectProps | DropzoneProps)

export default function InputField(props: InputFieldProps) {
  const { type, title, value, onChange, readOnly, colorPickerButton, copyButton, clearButton, styles } = props
  const { alphabet, includedInAlphabet } = type === "text" ? props : { alphabet: "", includedInAlphabet: false }
  const { min, max, step } = type === "number" ? props : { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER, step: 1 }
  const { options } = type === "select" ? props : { options: [] }
  const { onLoad, readAs, accept, fileNames, setFileNames, useClear } = type === "dropzone" ? props : { onLoad: () => { }, readAs: "", accept: {}, fileNames: [], setFileNames: () => { }, useClear: () => { } }

  const minHeight = props.minHeight || "40px"
  const [height, setHeight] = useState(minHeight)
  const haveButton = copyButton || colorPickerButton || clearButton

  const middleStyles = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: haveButton ? 0 : [0, 0, 6],
    borderBottomLeftRadius: [6, 6, 0],
    borderBottomRightRadius: haveButton ? 0 : 6
  }
  const rightStyles = {
    minHeight: minHeight,
    height: "100%",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: [0, 0, 6]
  }
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      const { scrollHeight } = ref.current
      setHeight(scrollHeight > parseInt(minHeight) ? `${scrollHeight}px` : minHeight)
    }
  })

  return <InputGroup {...styles} flexDirection={["column", "column", "row"]}>
    {title && <InputLeftAddon
      {...{ minHeight, height }}
      borderBottomLeftRadius={[0, 0, 6]}
      borderTopRightRadius={[6, 6, 0]}
      margin={0}
    >
      {title}
    </InputLeftAddon>}
    <Flex width="100%">
      {
        type === "text" && <Textarea
          {...{ ref, minHeight, height, readOnly, value }}
          {...middleStyles}
          focusBorderColor="gray"
          resize="none"
          overflow="hidden"
          onChange={event => {
            onChange(includedInAlphabet
              ? event.target.value.split("").filter(i => alphabet.includes(i)).join("")
              : event.target.value
            )
          }}
        />
      }
      {
        type === "number" && <NumberInput
          {...{ step, min, max, value, onChange }}
          width="100%"
          focusBorderColor="gray"
          defaultValue={3}
        >
          <NumberInputField {...middleStyles} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      }
      {
        type === "select" && <Select
          {...middleStyles}
          {...{ value }}
          focusBorderColor="gray"
          onChange={event => { onChange(event.target.value) }}
        >
          {options.map(
            option => <option key={option.name || option} value={option.name || option}  >
              {option.title || option.name || option}
            </option>
          )}
        </Select>
      }
      {
        type === "dropzone" && <Dropzone
          {...{ accept }}
          onDrop={(files) => {
            useClear()
            setFileNames(files.map(({ name }) => name))
            files.map(file => {
              const reader = new FileReader()
              reader.onload = onLoad
              if (readAs === "string" || !readAs) reader.readAsText(file)
              if (readAs === "binary") reader.readAsBinaryString(file)
            })
          }}>
          {
            ({ getRootProps, getInputProps }) => <>
              <Textarea
                {...{ ref, minHeight, height, readOnly, value }}
                {...middleStyles}
                {...getRootProps()}
                resize="none"
                readOnly
                value={fileNames.join(", ") || value}
                cursor="pointer"
              />
              <Input {...getInputProps()} width={0} margin={0} size="" />
            </>
          }
        </Dropzone>
      }
      {
        haveButton && <InputRightAddon
          {...{ minHeight, height }}
          borderTopRightRadius={[0, 0, 6]}
          padding={0}
          border={0}
        >
          {copyButton && <Copy {...{ value }} styles={rightStyles} />}
          {colorPickerButton && <ColorPicker {...{ value, onChange }} styles={rightStyles} />}
          {clearButton && <Clear {...{ useClear }} styles={rightStyles} />}
        </InputRightAddon>
      }
    </Flex>
  </InputGroup >
}