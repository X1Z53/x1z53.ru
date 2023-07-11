import { Box, SimpleGrid } from "@chakra-ui/react"
import { CheckBox, InputField } from "components/form"
import { useToggle } from "modules/hooks"
import { DotType } from "qr-code-styling"
import { useEffect, useRef, useState } from "react"
import { SketchPicker } from "react-color"

export default function App() {
  const [url, setUrl] = useState("Hello, World!")
  const [useCustomDotsStyle, toggleUseCustomDotsStyle] = useToggle(false)
  const ref = useRef(null)

  const dotsTypes = ["classy", "classy-rounded", "dots", "extra-rounded", "rounded", "square"]

  const [dotsType, setDotsType] = useState<DotType>("rounded")
  const [dotsColor, setDotsColor] = useState("#000000")

  useEffect(() => {
    if (ref.current) {
      import("qr-code-styling").then((QRCodeStyling) => {
        const qrCode = new QRCodeStyling.default({
          dotsOptions: {
            type: dotsType,
            color: dotsColor
          },
        })
        qrCode.append(ref.current)
        qrCode.update({ data: url })
      })
    }
  }, [url, dotsType, dotsColor])

  return (
    <>
      <SimpleGrid columns={[1, 1, 2]} spacing={4} marginBottom={4}>
        <InputField title="Текст" type="text" value={url} callback={setUrl} />
        <CheckBox callback={toggleUseCustomDotsStyle} value={useCustomDotsStyle} text="Настройка стиля точек" />
        {
          useCustomDotsStyle && <>
            <InputField
              title="Тип точек"
              type="select"
              value={dotsType}
              callback={type => { setDotsType(type as DotType) }}
              options={dotsTypes}
            />
            <InputField
              title="Цвет точек"
              type="text"
              value={dotsColor}
              callback={color => { setDotsColor(color.hex) }}
              colorPickerButton
              readOnly
            />
          </>
        }
      </SimpleGrid>
      <Box ref={ref} />
    </>
  )
}
