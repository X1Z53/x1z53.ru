import {
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from "@chakra-ui/react"
import { ClearButton, ColorPickerButton, CopyButton } from "components"
import { cloneElement, useEffect, useRef, useState } from "react"
import Dropzone from "react-dropzone"
import { InputFieldProps } from "types"

export default function InputField(props: InputFieldProps) {
  const {
    type,
    title,
    value,
    onChange,
    inGroup,
    readOnly,
    colorPickerButton,
    copyButton,
    clearButton,
    isFirst,
    isLast,
    styles,
  } = props
  const { alphabet, includedInAlphabet } = type === "text" && props
  const { min, max, step } = type === "number" && props
  const { options } = type === "select" && props
  const { children } = type === "group" && props
  const { onLoad, readAs, accept, fileNames, setFileNames, useClear } =
    type === "dropzone"
      ? props
      : {
          onLoad: () => {},
          readAs: "",
          accept: {},
          fileNames: [],
          setFileNames: () => {},
          useClear: () => {},
        }

  const minHeight = props.minHeight || "40px"
  const [height, setHeight] = useState(minHeight)
  const haveButton = copyButton || colorPickerButton || clearButton

  const leftStyles = {
    borderBottomLeftRadius: [0, 0, 6],
    borderTopRightRadius: [6, 6, 0],
  }
  const rightStyles = {
    minHeight: minHeight,
    height: "100%",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: [0, 0, 6],
  }
  const middleStyles = isFirst
    ? {
        borderRadius: 0,
        borderBottomLeftRadius: [6, 6, 0],
      }
    : isLast
    ? rightStyles
    : inGroup
    ? {
        borderRadius: 0,
      }
    : {
        borderTopLeftRadius: title && 0,
        borderTopRightRadius: title ? [0, 0, 6] : haveButton && 0,
        borderBottomLeftRadius: title && [6, 6, 0],
        borderBottomRightRadius: haveButton && 0,
      }

  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      const { scrollHeight } = ref.current
      setHeight(
        scrollHeight > parseInt(minHeight) ? `${scrollHeight}px` : minHeight,
      )
    }
  })

  return (
    <InputGroup {...styles} flexDirection={["column", "column", "row"]}>
      {title && (
        <InputLeftAddon {...{ minHeight, height }} {...leftStyles} margin={0}>
          {title}
        </InputLeftAddon>
      )}
      <Flex width="100%">
        {type === "text" && (
          <Textarea
            {...{ ref, minHeight, height, readOnly, value }}
            {...middleStyles}
            focusBorderColor="gray"
            resize="none"
            overflow="hidden"
            onChange={(event) => {
              onChange(
                includedInAlphabet
                  ? event.target.value
                      .split("")
                      .filter((i) => alphabet.includes(i))
                      .join("")
                  : event.target.value,
              )
            }}
          />
        )}
        {type === "number" && (
          <NumberInput
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
        )}
        {type === "select" && (
          <Select
            {...middleStyles}
            {...{ value }}
            focusBorderColor="gray"
            onChange={(event) => {
              onChange(event.target.value)
            }}
          >
            {options.map((option) => (
              <option key={option.name || option} value={option.name || option}>
                {option.title || option.name || option}
              </option>
            ))}
          </Select>
        )}
        {type === "dropzone" && (
          <Dropzone
            {...{ accept }}
            onDrop={(files) => {
              useClear()
              setFileNames(files.map(({ name }) => name))
              files.map((file) => {
                const reader = new FileReader()
                reader.onload = onLoad
                if (readAs === "string" || !readAs) reader.readAsText(file)
                if (readAs === "binary") reader.readAsBinaryString(file)
              })
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <>
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
            )}
          </Dropzone>
        )}
        {type === "group" &&
          children.map((child, index) =>
            cloneElement(child, {
              inGroup: true,
              isFirst: !index,
              isLast: index === children.length - 1,
            }),
          )}
        {haveButton && (
          <InputRightAddon
            {...{ minHeight, height }}
            borderTopRightRadius={[0, 0, 6]}
            padding={0}
            border={0}
          >
            {copyButton && <CopyButton {...{ value }} styles={rightStyles} />}
            {colorPickerButton && (
              <ColorPickerButton
                {...{ value, onChange }}
                styles={rightStyles}
              />
            )}
            {clearButton && (
              <ClearButton {...{ useClear }} styles={rightStyles} />
            )}
          </InputRightAddon>
        )}
      </Flex>
    </InputGroup>
  )
}
