import { Flex, InputGroup, InputLeftAddon, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, StyleProps, Textarea } from "@chakra-ui/react"
import { ColorPicker, Copy } from "components/buttons"
import { useState } from "react"

export default function InputField({
  title = "",
  type = "text",
  value,
  alphabet,
  callback,
  colorPickerButton = false,
  copyButton = false,
  includedInAlphabet = false,
  maxValue,
  minValue,
  options,
  readOnly = false,
  styles,
}:
  {
    title: string,
    type: string,
    value: string,
    alphabet?: string,
    callback?: (any) => void,
    colorPickerButton?: boolean,
    copyButton?: boolean,
    includedInAlphabet?: boolean,
    maxValue?: number,
    minValue?: number,
    options?: any[],
    readOnly?: boolean,
    styles?: StyleProps,
  }) {

  const minHeight = "40px"
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
          focusBorderColor="white"
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
          width="100%"
          focusBorderColor="white"
          defaultValue={3}
          min={minValue ? minValue : Number.MIN_SAFE_INTEGER}
          max={maxValue ? maxValue : Number.MAX_SAFE_INTEGER}
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
          {options.map(
            option => <option key={option} value={option}>{option}</option>
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