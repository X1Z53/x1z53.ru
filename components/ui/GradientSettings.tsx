import { InputField } from "components/form"

type GradientSettingsProps = {
  useGradient: boolean
  colorOffset: [number, (any) => void]
  secondColor: [string, (any) => void]
  secondColorOffset: [number, (any) => void]
  rotation: [number, (any) => void]
  type: [string, (any) => void]
}

export default function GradientSettings({
  useGradient,
  colorOffset,
  secondColor,
  secondColorOffset,
  rotation,
  type
}: GradientSettingsProps) {
  const types = ["linear", "radial"]

  return <>
    {useGradient && <>
      <InputField
        type="number"
        title="Сдвиг первого цвета"
        value={colorOffset[0].toString()}
        onChange={colorOffset[1]}
        step={0.1}
        min={0}
        max={1} />
      <InputField
        type="text"
        title="Цвет градиента"
        value={secondColor[0]}
        onChange={color => { secondColor[1](color.hex) }}
        colorPickerButton
        readOnly />
      <InputField
        type="number"
        title="Сдвиг второго цвета"
        value={secondColorOffset[0].toString()}
        onChange={secondColorOffset[1]}
        step={0.1}
        min={0}
        max={1} />
      <InputField
        type="number"
        title="Поворот градиента"
        value={rotation[0].toString()}
        onChange={rotation[1]}
        step={0.1}
        min={0}
        max={6.3} />
      <InputField
        type="select"
        title="Тип градиента"
        value={type[0]}
        options={types}
        onChange={type[1]} />
    </>}
  </>
}
