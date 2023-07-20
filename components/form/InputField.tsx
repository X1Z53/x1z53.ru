import { Flex, InputGroup, InputLeftAddon, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, StyleProps, Textarea } from "@chakra-ui/react"
import { ColorPicker, Copy } from "components/buttons"
import { useState } from "react"

type TextProps = {
  type: "text"
  alphabet?: string
  includedInAlphabet?: boolean
}

type NumberProps = {
  type: "number"
  minValue?: number
  maxValue?: number
  step?: number
}

type SelectProps = {
  type: "select"
  options?: string[] | object[]
}

type InputFieldProps = {
  title: string
  value: string
  callback?: (any) => void
  readOnly?: boolean
  colorPickerButton?: boolean
  copyButton?: boolean
  styles?: StyleProps
  minHeight?: string
} & (TextProps | NumberProps | SelectProps)


export default function InputField(props: InputFieldProps) {
  const { type, title, value, callback, readOnly, colorPickerButton, copyButton, styles } = props
  const { alphabet, includedInAlphabet } = type === "text" ? props : { alphabet: "", includedInAlphabet: false }
  const { minValue, maxValue, step } = type === "number" ? props : { minValue: Number.MIN_SAFE_INTEGER, maxValue: Number.MAX_SAFE_INTEGER, step: 1 }
  const { options } = type === "select" ? props : { options: [] }

  const minHeight = props.minHeight || "40px"
  const [height, setHeight] = useState(minHeight)

  const middleStyles = {
    borderTopLeftRadius: "0",
    borderTopRightRadius: copyButton || colorPickerButton ? 0 : [0, 0, 6],
    borderBottomLeftRadius: [6, 6, 0],
    borderBottomRightRadius: copyButton || colorPickerButton ? 0 : 6
  }
  const rightStyles = {
    minHeight: minHeight,
    height: "100%",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    borderTopRightRadius: [0, 0, 6]
  }

  return <InputGroup {...styles} flexDirection={["column", "column", "row"]}>
    <InputLeftAddon
      borderBottomLeftRadius={[0, 0, 6]}
      borderTopRightRadius={[6, 6, 0]}
      minHeight={minHeight}
      height={height}
      margin="0"
    >
      {title}
    </InputLeftAddon>
    <Flex width="100%">
      {
        type === "text" ? <Textarea
          {...middleStyles}
          minHeight={minHeight}
          height={height}
          focusBorderColor="gray"
          readOnly={readOnly}
          value={value}
          onMouseMove={event => {
            setHeight(event.currentTarget.style.height + "px")
          }}
          onChange={event => {
            callback(includedInAlphabet
              ? event.target.value.split("").filter(i => alphabet.includes(i)).join("")
              : event.target.value
            )
          }}
        /> : type === "number" ? <NumberInput
          step={step}
          width="100%"
          focusBorderColor="gray"
          defaultValue={3}
          min={minValue}
          max={maxValue}
          value={value}
          onChange={callback}
        >
          <NumberInputField {...middleStyles} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput> : type === "select" ? <Select
          {...middleStyles}
          value={value}
          onChange={event => { callback(event.target.value) }}
        >
          {typeof options[0] !== "object" ? options.map(
            option => <option key={option} value={option}>{option}</option>
          ) : options.map(
            option => <option key={option.name} value={option.name}>
              {option.title}
            </option>
          )}
        </Select> : <></>
      }
      <InputRightAddon
        minHeight={minHeight}
        height={height}
        borderTopRightRadius={[0, 0, 6]}
        padding="0"
        border={0}
      >
        {
          copyButton &&
          <Copy value={value} styles={rightStyles} />
        }
        {
          colorPickerButton &&
          <ColorPicker styles={rightStyles} value={value} callback={callback} />
        }
      </InputRightAddon>
    </Flex>
  </InputGroup>
}