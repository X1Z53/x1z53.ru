import { Button, Icon, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, StyleProps } from "@chakra-ui/react"
import { SketchPicker } from "react-color"
import { MdOutlineColorize } from "react-icons/md"

export default function ColorPicker({ styles, value, callback }: { styles?: StyleProps, value: string, callback: (any) => any }) {
  return <Popover>
    <PopoverTrigger>
      <Button {...styles}>
        <Icon boxSize={6} as={MdOutlineColorize} />
      </Button>
    </PopoverTrigger>
    <PopoverContent width="auto">
      <PopoverArrow />
      <PopoverBody>
        <SketchPicker
          color={value}
          onChange={callback}
        />
      </PopoverBody>
    </PopoverContent>
  </Popover >
}