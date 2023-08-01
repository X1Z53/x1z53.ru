import { IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal } from "@chakra-ui/react"
import { SketchPicker } from "react-color"
import { BsEyedropper } from "react-icons/bs"
import { ColorPickerButtonProps } from "types"

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