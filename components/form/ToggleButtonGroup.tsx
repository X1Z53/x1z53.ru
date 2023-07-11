import { Button, ButtonGroup } from "@chakra-ui/react"
import { useState } from "react"

export default function ToggleButtonGroup({ buttons, callback }: { buttons: string[], callback: (param: string) => void }) {
  const [selected, setSelected] = useState(buttons[0])
  return <ButtonGroup isAttached variant="outline">
    {buttons.map(buttonName =>
      <Button
        key={buttonName}
        colorScheme={selected === buttonName ? "" : "gray"}
        onClick={() => {
          setSelected(buttonName)
          callback(buttonName)
        }}
      >
        {buttonName}
      </Button>
    )}
  </ButtonGroup>
}