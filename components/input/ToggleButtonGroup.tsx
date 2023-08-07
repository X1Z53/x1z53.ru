import { Button, ButtonGroup } from "@chakra-ui/react"
import { useState } from "react"
import { ToggleButtonGroupProps } from "types"

export default function ToggleButtonGroup({
  buttons,
  noSelect,
  noAdaptive,
  onChange,
}: ToggleButtonGroupProps) {
  const [selected, setSelected] = useState(buttons[0])

  return (
    <ButtonGroup
      isAttached={noAdaptive}
      flexDirection={noAdaptive ? "row" : ["column", "column", "row"]}
      variant="outline"
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          colorScheme={selected === button && !noSelect ? "" : "gray"}
          onClick={() => {
            setSelected(button)
            onChange(button)
          }}
          {...(!noAdaptive && {
            borderTopLeftRadius: index !== 0 && 0,
            borderTopRightRadius: !index
              ? [6, 6, 0]
              : index === buttons.length - 1
              ? [0, 0, 6]
              : 0,
            borderBottomLeftRadius: !index
              ? [0, 0, 6]
              : index === buttons.length - 1
              ? [6, 6, 0]
              : 0,
            borderBottomRightRadius: index !== buttons.length - 1 && 0,
          })}
          style={{ margin: 0 }}
        >
          {button}
        </Button>
      ))}
    </ButtonGroup>
  )
}
