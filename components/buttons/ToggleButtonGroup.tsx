import { Button, ButtonGroup } from "@chakra-ui/react"
import { useState } from "react"

export default function ToggleButtonGroup({buttons, callback}: {buttons: string[], callback: (param: string) => void}) {
  const [selected, setSelected] = useState(buttons[0])
  return <ButtonGroup isAttached variant="outline">
    {buttons.map(name =>
      <Button
        key={name}
        colorScheme={selected === name ? "" : "gray"}
        onClick={() => {
          setSelected(name)
          callback(name)
        }}
      >
        {name}
      </Button>
    )}
  </ButtonGroup>
}