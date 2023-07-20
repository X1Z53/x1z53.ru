import { Button, ButtonGroup } from "@chakra-ui/react"
import { useState } from "react"

type ToggleButtonGroupProps = {
  buttons: string[],
  onChange: (any: string) => void
}

export default function ToggleButtonGroup({ buttons, onChange }: ToggleButtonGroupProps) {
  const [selected, setSelected] = useState(buttons[0])
  return <ButtonGroup isAttached variant="outline">
    {buttons.map(buttonName =>
      <Button
        key={buttonName}
        colorScheme={selected === buttonName ? "" : "gray"}
        onClick={() => {
          setSelected(buttonName)
          onChange(buttonName)
        }}
      >
        {buttonName}
      </Button>
    )}
  </ButtonGroup>
}