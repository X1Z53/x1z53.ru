import { Box, SimpleGrid } from "@chakra-ui/react"
import { CheckBox, InputField } from "components/form"
import { PageCreator, StandardGrid } from "components/layout"
import { GradientSettings } from "components/ui"
import { generators } from "databases"
import { useToggle } from "features/hooks"
import { getDatabaseObject } from "features/utils"
import { CornerDotType, CornerSquareType, DotType, GradientType, TypeNumber } from "qr-code-styling"
import { useEffect, useRef, useState } from "react"

export default function QRCode() {
  const [text, setText] = useState("Hello, World!")
  const [qrType, setQrType] = useState<TypeNumber>(0)
  const [useMargin, toggleUseMargin] = useToggle(true)

  const [useCustomStyles, toggleUseCustomStyles] = useToggle(false)

  const [
    [useImage, toggleUseImage],
    [imageUrl, setImageUrl],
    [hideBackgroundDots, toggleHideBackgroundDots],
    [imageSize, setImageSize],
    [imageMargin, setImageMargin]
  ] = [useToggle(false), useState("https://images.x1z53.ru/x1z53.svg"), useToggle(true), useState(0.4), useState(5)]

  const [
    [useBackground, toggleUseBackground],
    [useBackgroundGradient, toggleUseBackgtoundGradient],
    [backgroundColor, setBackgroundColor],
    [backgroundColorOffset, setBackgroundColorOffset],
    [backgroundGradientType, setBackgroundGradientType],
    [backgroundRotation, setBackgroundRotation],
    [backgroundSecondColor, setBackgroundSecondColor],
    [backgroundSecondColorOffset, setBackgroundSecondColorOffset]
  ] = [useToggle(false), useToggle(false), useState("#1a202c"), useState(0), useState<GradientType>("linear"), useState(0), useState("#1a202c"), useState(1)]

  const dotsTypes = ["classy", "classy-rounded", "dots", "extra-rounded", "rounded", "square"]
  const [
    [useDotsStyle, toggleUseDotsStyle],
    [useDotsGradient, toggleUseDotsGradient],
    [dotsType, setDotsType],
    [dotsGradientType, setDotsGradientType],
    [dotsRotation, setDotsRotation],
    [dotsColor, setDotsColor],
    [dotsColorOffset, setDotsColorOffset],
    [dotsSecondColor, setDotsSecondColor],
    [dotsSecondColorOffset, setDotsSecondColorOffset]
  ] = [useToggle(false), useToggle(false), useState<DotType>("square"), useState<GradientType>("linear"), useState(0), useState("#ffffff"), useState(0), useState("#ffffff"), useState(1)]

  const cornerSquareTypes = ["dot", "extra-rounded", "square"]
  const [
    [useCornerSquaresStyle, toggleUseCornerSquaresStyle],
    [useCornerSquaresGradient, toggleUseCornerSquaresGradient],
    [cornerSquaresType, setCornerSquaresType],
    [cornerSquaresGradientType, setCornerSquaresGradientType],
    [cornerSquaresRotation, setCornerSquaresRotation],
    [cornerSquaresColor, setCornerSquaresColor],
    [cornerSquaresColorOffset, setCornerSquaresColorOffset],
    [cornerSquaresSecondColor, setCornerSquaresSecondColor],
    [cornerSquaresSecondColorOffset, setCornerSquaresSecondColorOffset]
  ] = [useToggle(false), useToggle(false), useState<CornerSquareType>("square"), useState<GradientType>(dotsGradientType), useState(dotsRotation), useState(dotsColor), useState(dotsColorOffset), useState(dotsSecondColor), useState(dotsSecondColorOffset)]

  const cornerDotTypes = ["dot", "square"]
  const [
    [useCornerDotsStyle, toggleUseCornerDotsStyle],
    [useCornerDotsGradient, toggleUseCornerDotsGradient],
    [cornerDotsType, setCornerDotsType],
    [cornerDotsGradientType, setCornerDotsGradientType],
    [cornerDotsRotation, setCornerDotsRotation],
    [cornerDotsColor, setCornerDotsColor],
    [cornerDotsColorOffset, setCornerDotsColorOffset],
    [cornerDotsSecondColor, setCornerDotsSecondColor],
    [cornerDotsSecondColorOffset, setCornerDotsSecondColorOffset]
  ] = [useToggle(false), useToggle(false), useState<CornerDotType>("square"), useState<GradientType>(cornerSquaresGradientType), useState(cornerSquaresRotation), useState(cornerSquaresColor), useState(cornerSquaresColorOffset), useState(cornerSquaresSecondColor), useState(cornerSquaresSecondColorOffset)]

  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      import("qr-code-styling").then((QRCodeStyling) => {
        const qrCode = new QRCodeStyling.default({
          type: "svg",
          qrOptions: { typeNumber: qrType },
          margin: Number(useMargin),
          image: useImage ? imageUrl : "",
          imageOptions: {
            hideBackgroundDots: hideBackgroundDots,
            imageSize: imageSize,
            margin: imageMargin,
          },
          backgroundOptions: {
            gradient: {
              type: backgroundGradientType,
              rotation: backgroundRotation,
              colorStops: [
                { offset: backgroundColorOffset, color: backgroundColor },
                { offset: backgroundSecondColorOffset, color: backgroundSecondColor }
              ]
            },
          },
          dotsOptions: {
            type: dotsType,
            gradient: {
              type: dotsGradientType,
              rotation: dotsRotation,
              colorStops: [
                { offset: dotsColorOffset, color: dotsColor },
                { offset: dotsSecondColorOffset, color: dotsSecondColor }
              ]
            },
          },
          cornersSquareOptions: {
            type: cornerSquaresType,
            gradient: {
              type: cornerSquaresGradientType,
              rotation: cornerSquaresRotation,
              colorStops: [
                { offset: cornerSquaresColorOffset, color: cornerSquaresColor },
                { offset: cornerSquaresSecondColorOffset, color: cornerSquaresSecondColor }
              ]
            },
          },
          cornersDotOptions: {
            type: cornerDotsType,
            gradient: {
              type: cornerDotsGradientType,
              rotation: cornerDotsRotation,
              colorStops: [
                { offset: cornerDotsColorOffset, color: cornerDotsColor },
                { offset: cornerDotsSecondColorOffset, color: cornerDotsSecondColor }
              ]
            },
          },
        })
        qrCode.append(ref.current)
        qrCode.update({ data: text })
      })
    }
  }, [
    text, qrType, useMargin,
    useImage, imageUrl, hideBackgroundDots, imageSize, imageMargin,
    useBackgroundGradient, backgroundColor, backgroundColorOffset, backgroundGradientType, backgroundRotation, backgroundSecondColor, backgroundSecondColorOffset,
    dotsType, useDotsGradient, dotsColor, dotsColorOffset, dotsGradientType, dotsRotation, dotsSecondColor, dotsSecondColorOffset,
    cornerSquaresType, useCornerSquaresGradient, cornerSquaresColor, cornerSquaresColorOffset, cornerSquaresGradientType, cornerSquaresRotation, cornerSquaresSecondColor, cornerSquaresSecondColorOffset,
    cornerDotsType, useCornerDotsGradient, cornerDotsColor, cornerDotsColorOffset, cornerDotsGradientType, cornerDotsRotation, cornerDotsSecondColor, cornerDotsSecondColorOffset,
  ])

  const generator = getDatabaseObject(generators, "qrcode")

  return <PageCreator {...generator}>
    <StandardGrid>
      <InputField type="text" title="Текст" value={text} callback={setText} />
      <InputField type="number" title="Тип QR-кода" minValue={0} maxValue={40} value={qrType.toString()} callback={setQrType} />
      <CheckBox title="Отсуп по краям" value={useMargin} callback={toggleUseMargin} />
      <CheckBox title="Дополнительные настройки" value={useCustomStyles} callback={toggleUseCustomStyles} />
      {
        useCustomStyles && <>
          <CheckBox title="Встроить изображение" value={useImage} callback={toggleUseImage} />
          <SimpleGrid spacing={4}>
            {
              useImage && <>
                <Box />
                <InputField
                  type="text"
                  title="Ссылка на изображение"
                  value={imageUrl}
                  callback={setImageUrl}
                />
                <CheckBox
                  title="Скрыть точки за изображением"
                  value={hideBackgroundDots}
                  callback={toggleHideBackgroundDots}
                />
                <InputField
                  type="number"
                  title="Размер изображения"
                  value={imageSize.toString()}
                  callback={setImageSize}
                  step={0.1}
                />
                <InputField
                  type="number"
                  title="Отступ изображения"
                  value={imageMargin.toString()}
                  callback={setImageMargin}
                />
              </>
            }
          </SimpleGrid>
          <CheckBox title="Настройка фона" value={useBackground} callback={toggleUseBackground} />
          <SimpleGrid spacing={4}>
            {
              useBackground && <>
                <CheckBox title="Использовать градиент" callback={toggleUseBackgtoundGradient} value={useBackgroundGradient} />
                <InputField
                  type="text"
                  title="Цвет фона"
                  value={backgroundColor}
                  callback={color => { setBackgroundColor(color.hex) }}
                  colorPickerButton
                  readOnly
                />
                <GradientSettings
                  colorOffset={[backgroundColorOffset, setBackgroundColorOffset]}
                  rotation={[backgroundRotation, setBackgroundRotation]}
                  secondColor={[backgroundSecondColor, setBackgroundSecondColor]}
                  secondColorOffset={[backgroundSecondColorOffset, setBackgroundSecondColorOffset]}
                  type={[backgroundGradientType, setBackgroundGradientType]}
                  useGradient={useBackgroundGradient}
                />
              </>
            }
          </SimpleGrid>
          <CheckBox title="Настройка стиля точек" value={useDotsStyle} callback={toggleUseDotsStyle} />
          <SimpleGrid spacing={4}>
            {
              useDotsStyle && <>
                <InputField
                  type="select"
                  title="Тип точек"
                  value={dotsType}
                  callback={type => {
                    setDotsType(type as DotType)
                    !useCornerSquaresStyle && setCornerSquaresType(type as CornerSquareType)
                    !useCornerDotsStyle && setCornerDotsType(type as CornerDotType)
                  }}
                  options={dotsTypes}
                />
                <CheckBox title="Использовать градиент" callback={toggleUseDotsGradient} value={useDotsGradient} />
                <InputField
                  type="text"
                  title="Цвет точек"
                  value={dotsColor}
                  callback={color => {
                    setDotsColor(color.hex)
                    !useCornerSquaresStyle && setCornerSquaresColor(color.hex)
                    !useCornerDotsStyle && setCornerDotsColor(color.hex)
                  }}
                  colorPickerButton
                  readOnly
                />
                <GradientSettings
                  colorOffset={[dotsColorOffset, value => {
                    setDotsColorOffset(value)
                    !useCornerSquaresStyle && setCornerSquaresColorOffset(value)
                    !useCornerDotsStyle && setCornerSquaresColorOffset(value)
                  }]}
                  rotation={[dotsRotation, value => {
                    setDotsRotation(value)
                    !useCornerSquaresStyle && setCornerSquaresRotation(value)
                    !useCornerDotsStyle && setCornerDotsRotation(value)
                  }]}
                  secondColor={[dotsSecondColor, value => {
                    setDotsSecondColor(value)
                    !useCornerSquaresStyle && setCornerSquaresSecondColor(value)
                    !useCornerDotsStyle && setCornerDotsSecondColor(value)
                  }]}
                  secondColorOffset={[dotsSecondColorOffset, value => {
                    setDotsSecondColorOffset(value)
                    !useCornerSquaresStyle && setCornerSquaresSecondColorOffset(value)
                    !useCornerDotsStyle && setCornerDotsSecondColorOffset(value)
                  }]}
                  type={[dotsGradientType, value => {
                    setDotsGradientType(value)
                    !useCornerSquaresStyle && setCornerSquaresGradientType(value)
                    !useCornerDotsStyle && setCornerDotsGradientType(value)
                  }]}
                  useGradient={useDotsGradient}
                />
              </>
            }
          </SimpleGrid>
          <CheckBox title="Настройка угловых квадратов" value={useCornerSquaresStyle} callback={toggleUseCornerSquaresStyle} />
          <SimpleGrid spacing={4}>
            {
              useCornerSquaresStyle && <>
                <InputField
                  type="select"
                  title="Тип угловых квадратов"
                  value={cornerSquaresType}
                  callback={type => {
                    setCornerSquaresType(type as CornerSquareType)
                    !useCornerDotsStyle && setCornerDotsType(type as CornerDotType)
                  }}
                  options={cornerSquareTypes}
                />
                <CheckBox title="Использовать градиент" callback={toggleUseCornerSquaresGradient} value={useCornerSquaresGradient} />
                <InputField
                  type="text"
                  title="Цвет угловых квадратов"
                  value={cornerSquaresColor}
                  callback={color => {
                    setCornerSquaresColor(color.hex)
                    !useCornerDotsStyle && setCornerDotsColor(color.hex)
                  }}
                  colorPickerButton
                  readOnly
                />
                <GradientSettings
                  colorOffset={[cornerSquaresColorOffset, value => {
                    setCornerSquaresColorOffset(value)
                    !useCornerDotsStyle && setCornerDotsColorOffset(value)
                  }]}
                  rotation={[cornerSquaresRotation, value => {
                    setCornerSquaresRotation(value)
                    !useCornerDotsStyle && setCornerDotsRotation(value)
                  }]}
                  secondColor={[cornerSquaresSecondColor, value => {
                    setCornerSquaresSecondColor(value)
                    !useCornerDotsStyle && setCornerDotsSecondColor(value)
                  }]}
                  secondColorOffset={[cornerSquaresSecondColorOffset, value => {
                    setCornerSquaresSecondColorOffset(value)
                    !useCornerDotsStyle && setCornerDotsSecondColorOffset(value)
                  }]}
                  type={[cornerSquaresGradientType, value => {
                    setCornerSquaresGradientType(value)
                    !useCornerDotsStyle && setCornerDotsGradientType(value)
                  }]}
                  useGradient={useCornerSquaresGradient}
                />
              </>
            }
          </SimpleGrid>
          <CheckBox title="Настройка стиля угловых точек" value={useCornerDotsStyle} callback={toggleUseCornerDotsStyle} />
          <SimpleGrid spacing={4}>
            {
              useCornerDotsStyle && <>
                <InputField
                  type="select"
                  title="Тип угловых точек"
                  value={cornerDotsType}
                  callback={type => { setCornerDotsType(type as CornerDotType) }}
                  options={cornerDotTypes}
                />
                <CheckBox title="Использовать градиент" callback={toggleUseCornerDotsGradient} value={useCornerDotsGradient} />
                <InputField
                  type="text"
                  title="Цвет угловых точек"
                  value={cornerDotsColor}
                  callback={color => { setCornerDotsColor(color.hex) }}
                  colorPickerButton
                  readOnly
                />
                <GradientSettings
                  colorOffset={[cornerDotsColorOffset, setCornerDotsColorOffset]}
                  rotation={[cornerDotsRotation, setCornerDotsRotation]}
                  secondColor={[cornerDotsSecondColor, setCornerDotsSecondColor]}
                  secondColorOffset={[cornerDotsSecondColorOffset, setCornerDotsSecondColorOffset]}
                  type={[cornerDotsGradientType, setCornerDotsGradientType]}
                  useGradient={useCornerDotsGradient}
                />
              </>
            }
          </SimpleGrid>
        </>
      }
    </StandardGrid>
    <Box ref={ref} />
  </PageCreator>
}
