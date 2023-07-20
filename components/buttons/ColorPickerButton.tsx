import { Button, Icon, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal, StyleProps } from "@chakra-ui/react"
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
      <Button {...styles}>
        <Icon boxSize={6} as={BsEyedropper} />
      </Button>
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