import { IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal, StyleProps } from "@chakra-ui/react"
import { SketchPicker } from "react-color"
import { BsEyedropper } from "react-icons/bs"

type ColorPickerButtonProps = {
  styles?: StyleProps,
  value: string,
  onChange: (any) => void
}

export default function ColorPickerButton({ styles, value, onChange }: ColorPickerButtonProps) {
  return <Popover>
    <PopoverTrigger>
      <IconButton {...styles} icon={<BsEyedropper />} aria-label="Выбрать цвет" />
    </PopoverTrigger>
    <Portal>
      <PopoverContent width="auto">
        <PopoverArrow />
        <PopoverBody>
          <SketchPicker {...{ onChange }} color={value} />
        </PopoverBody>
      </PopoverContent>
    </Portal>
  </Popover >
}