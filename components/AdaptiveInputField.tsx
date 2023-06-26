import { Flex, Input, InputGroup, InputLeftAddon, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, StyleProps } from "@chakra-ui/react"
import Copy from "./buttons/Copy"

export default function AdaptiveInputField({ title = "", type = "text", value, callback, styles, minValue, maxValue, readOnly = false, copyButton = false }:
  { title: string, type: string, value: string | number, callback?: (i: any) => void, styles?: StyleProps, minValue?: number, maxValue?: number, readOnly?: boolean, copyButton?: boolean }) {

  return <InputGroup {...styles} flexDirection={["column", "column", "row"]}>
    <InputLeftAddon
      borderBottomLeftRadius={[0, 0, 6]}
      borderTopRightRadius={[6, 6, 0]}
      margin="0"
    >
      {title}
    </InputLeftAddon>
    <Flex width="100%">
      {
        type === "text" && <Input
          readOnly={readOnly}
          value={value}
          onChange={event => callback(event.target.value)}
          borderTopLeftRadius="0"
          borderTopRightRadius={copyButton ? 0 : [0, 0, 6]}
          borderBottomLeftRadius={[6, 6, 0]}
          borderBottomRightRadius={Number(!copyButton) * 6}
        />
      }
      {
        type === "number" && <NumberInput
          width="100%"
          defaultValue={3}
          min={minValue ? minValue : Number.MIN_SAFE_INTEGER}
          max={maxValue ? maxValue : Number.MAX_SAFE_INTEGER}
          value={value}
          onChange={callback}
        >
          <NumberInputField
            borderTopLeftRadius="0"
            borderTopRightRadius={[0, 0, 6]}
            borderBottomLeftRadius={[6, 6, 0]}
            borderBottomRightRadius={Number(!copyButton) * 6}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      }
      {
        copyButton && <InputRightAddon borderTopRightRadius={[0, 0, 6]} padding="0">
          <Copy value={value.toString()} styles={{
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            borderTopRightRadius: [0, 0, 6]
          }} />
        </InputRightAddon>
      }
    </Flex>
  </InputGroup>
}