import { Flex, InputGroup, InputLeftAddon, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, StyleProps, Textarea } from "@chakra-ui/react"
import { ColorPicker, Copy } from "components/buttons"
import { useEffect, useRef, useState } from "react"

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

type InputFieldProps = {
  title: string
  value: string
  onChange?: (any) => void
  readOnly?: boolean
  colorPickerButton?: boolean
  copyButton?: boolean
  styles?: StyleProps
  minHeight?: string
} & (TextProps | NumberProps | SelectProps)

export default function InputField(props: InputFieldProps) {
  const { type, title, value, onChange, readOnly, colorPickerButton, copyButton, styles } = props
  const { alphabet, includedInAlphabet } = type === "text" ? props : { alphabet: "", includedInAlphabet: false }
  const { min, max, step } = type === "number" ? props : { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER, step: 1 }
  const { options } = type === "select" ? props : { options: [] }

  const minHeight = props.minHeight || "40px"
  const [height, setHeight] = useState(minHeight)

  const middleStyles = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: copyButton || colorPickerButton ? 0 : [0, 0, 6],
    borderBottomLeftRadius: [6, 6, 0],
    borderBottomRightRadius: copyButton || colorPickerButton ? 0 : 6
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
    <InputLeftAddon
      {...{ minHeight, height }}
      borderBottomLeftRadius={[0, 0, 6]}
      borderTopRightRadius={[6, 6, 0]}
      margin={0}
    >
      {title}
    </InputLeftAddon>
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
      <InputRightAddon
        {...{ minHeight, height }}
        borderTopRightRadius={[0, 0, 6]}
        padding={0}
        border={0}
      >
        {copyButton && <Copy {...{ value }} styles={rightStyles} />}
        {colorPickerButton && <ColorPicker {...{ value, onChange }} styles={rightStyles} />}
      </InputRightAddon>
    </Flex>
  </InputGroup>
}