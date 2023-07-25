import { Button, ButtonGroup } from "@chakra-ui/react"
import { useState } from "react"

type ToggleButtonGroupProps = {
  buttons: string[],
  onChange: (any: string) => void
}

export default function ToggleButtonGroup({ buttons, onChange }: ToggleButtonGroupProps) {
  const [selected, setSelected] = useState(buttons[0])
  return <ButtonGroup flexDirection={["column", "column", "row"]} variant="outline">
    {buttons.map((buttonName, index) =>
      <Button
        key={buttonName}
        colorScheme={selected === buttonName ? "" : "gray"}
        onClick={() => {
          setSelected(buttonName)
          onChange(buttonName)
        }}
        borderTopLeftRadius={index !== 0 && 0}
        borderTopRightRadius={index === 0 ? [6, 6, 0] : index === buttons.length - 1 ? [0, 0, 6] : 0 }
        borderBottomLeftRadius={index === 0 ? [0, 0, 6] : index === buttons.length - 1 ? [6, 6, 0] : 0}
        borderBottomRightRadius={index !== buttons.length - 1 && 0}
        style={{margin: 0}}
      >
        {buttonName}
      </Button>
    )}
  </ButtonGroup>
}