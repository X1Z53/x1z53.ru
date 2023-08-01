import { Box, Button, Center } from "@chakra-ui/react"
import { CheckBox, InputField, PageGenerator, StandardGrid } from "components"
import { generators } from "databases"
import { getDatabaseObject, getLocaled, useToggle } from "modules"
import { CornerDotType, CornerSquareType, DotType, GradientType, TypeNumber } from "qr-code-styling"
import { useEffect, useRef, useState } from "react"

type GradientSettingsProps = {
  useGradient: boolean
  colorOffset: [number, (any) => void]
  secondColor: [string, (any) => void]
  secondColorOffset: [number, (any) => void]
  rotation: [number, (any) => void]
  type: [string, (any) => void]
}

function GradientSettings({
  useGradient,
  colorOffset,
  secondColor,
  secondColorOffset,
  rotation,
  type
}: GradientSettingsProps) {
  const { offsetTitle, secondTitle, secondOffsetTitle, rotationTitle, typeTitle } = getLocaled({
    ru: {
      offsetTitle: "Сдвиг первого цвета",
      secondTitle: "Цвет градиента",
      secondOffsetTitle: "Сдвиг второго цвета",
      rotationTitle: "Поворот градиента",
      typeTitle: "Тип градиента"
    },
    en: {
      offsetTitle: "First color offset",
      secondTitle: "Gradient folor",
      secondOffsetTitle: "Second color offset",
      rotationTitle: "Gradient rotation",
      typeTitle: "Gradient type"
    }
  })
  const types = ["linear", "radial"]

  return <>
    {
      useGradient && <>
        <InputField
          type="number"
          title={offsetTitle}
          value={colorOffset[0].toString()}
          onChange={colorOffset[1]}
          step={0.1}
          min={0}
          max={1} />
        <InputField
          type="text"
          title={secondTitle}
          value={secondColor[0]}
          onChange={color => { secondColor[1](color.hex) }}
          colorPickerButton
          readOnly />
        <InputField
          type="number"
          title={secondOffsetTitle}
          value={secondColorOffset[0].toString()}
          onChange={secondColorOffset[1]}
          step={0.1}
          min={0}
          max={1} />
        <InputField
          type="number"
          title={rotationTitle}
          value={rotation[0].toString()}
          onChange={rotation[1]}
          step={0.1}
          min={0}
          max={6.3} />
        <InputField
          type="select"
          title={typeTitle}
          value={type[0]}
          options={types}
          onChange={type[1]} />
      </>
    }
  </>
}


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

  const [fileName, setFileName] = useState("QR")
  const extensions = ["svg", "png", "jpeg", "webp"]
  const [extension, setExtension] = useState(extensions[0])

  const ref = useRef(null)
  let qrCode

  useEffect(() => {
    if (ref.current) {
      import("qr-code-styling").then((QRCodeStyling) => {
        qrCode = new QRCodeStyling.default({
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
                { offset: backgroundSecondColorOffset, color: useBackgroundGradient ? backgroundSecondColor : backgroundColor }
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
                { offset: dotsSecondColorOffset, color: useDotsGradient ? dotsSecondColor : dotsColor }
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
                { offset: cornerSquaresSecondColorOffset, color: useCornerSquaresGradient ? cornerSquaresSecondColor : cornerSquaresColor }
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
                { offset: cornerDotsSecondColorOffset, color: useCornerDotsGradient ? cornerDotsSecondColor : cornerDotsColor }
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
    fileName, extension,
    useImage, imageUrl, hideBackgroundDots, imageSize, imageMargin,
    useBackgroundGradient, backgroundColor, backgroundColorOffset, backgroundGradientType, backgroundRotation, backgroundSecondColor, backgroundSecondColorOffset,
    dotsType, useDotsGradient, dotsColor, dotsColorOffset, dotsGradientType, dotsRotation, dotsSecondColor, dotsSecondColorOffset,
    cornerSquaresType, useCornerSquaresGradient, cornerSquaresColor, cornerSquaresColorOffset, cornerSquaresGradientType, cornerSquaresRotation, cornerSquaresSecondColor, cornerSquaresSecondColorOffset,
    cornerDotsType, useCornerDotsGradient, cornerDotsColor, cornerDotsColorOffset, cornerDotsGradientType, cornerDotsRotation, cornerDotsSecondColor, cornerDotsSecondColorOffset,
  ])


  const {
    fileTitle, textTitle, qrcodeTypeTitle, marginTitle, customSettingsTitle,
    embedImageTitle, imageUrlTitle, hideBackgroundDotsTitle, imageSizeTitle, imageMarginTitle,
    backgroundOptionsTitle, backgroundColorTitle,
    dotsStyleTitle, dotsTypeTitle, dotsColorTitle,
    cornerSquaresOptionsTitle, cornerSquaresTypeTitle, cornerSquaresColorTitle,
    cornerDotsOptionsTitle, cornerDotsTypeTitle, cornerDotsColorTitle,
    gradientTitle
  } = getLocaled({
    ru: {
      fileTitle: "Файл",
      textTitle: "Текст",
      qrcodeTypeTitle: "Тип QR-кода",
      marginTitle: "Отступ по краям",
      customSettingsTitle: "Дополнительные настройки",
      embedImageTitle: "Встроить изображение",
      imageUrlTitle: "Ссылка на изображение",
      hideBackgroundDotsTitle: "Скрыть точки за изображением",
      imageSizeTitle: "Размер изображения",
      imageMarginTitle: "Отступ изображения",
      backgroundOptionsTitle: "Настройка фона",
      backgroundColorTitle: "Цвет фона",
      dotsStyleTitle: "Настройка стиля точек",
      dotsTypeTitle: "Тип точек",
      dotsColorTitle: "Цвет точек",
      cornerSquaresOptionsTitle: "Настройка угловых квадратов",
      cornerSquaresTypeTitle: "Тип угловых квадратов",
      cornerSquaresColorTitle: "Цвет угловых квадратов",
      cornerDotsOptionsTitle: "Настройки угловых точек",
      cornerDotsTypeTitle: "Тип угловых точек",
      cornerDotsColorTitle: "Цвет угловых точек",
      gradientTitle: "Использовать градиент"
    },
    en: {
      fileTitle: "File",
      textTitle: "Text",
      qrcodeTypeTitle: "QR code type",
      marginTitle: "Indentantion at edges",
      customSettingsTitle: "Custom settings",
      embedImageTitle: "Embed image",
      imageUrlTitle: "Image URL",
      hideBackgroundDotsTitle: "Hide background dots",
      imageSizeTitle: "Image size",
      imageMarginTitle: "Image indentantion",
      backgroundOptionsTitle: "Background settings",
      backgroundColorTitle: "Background color",
      dotsStyleTitle: "Dots style",
      dotsTypeTitle: "Dots type",
      dotsColorTitle: "Dots color",
      cornerSquaresOptionsTitle: "Corner squares options",
      cornerSquaresTypeTitle: "Corner squares type",
      cornerSquaresColorTitle: "Corner squares color",
      cornerDotsOptionsTitle: "Corner dots options",
      cornerDotsTypeTitle: "Corner dots type",
      cornerDotsColorTitle: "Corner dots color",
      gradientTitle: "Use gradient"
    }
  })

  return <PageGenerator {...getDatabaseObject(getLocaled(generators), "qrcode")}>
    <Center>
      <StandardGrid columns={1}>
        <Center>
          <Box ref={ref} />
        </Center>
        <InputField title={fileTitle} styles={{ width: "auto" }} type="group">
          <InputField value={fileName} onChange={setFileName} type="text" styles={{ borderRightRadius: "0" }} />
          <InputField type="select" options={extensions} value={extension} onChange={setExtension} />
        </InputField>
        <Button onClick={() => { qrCode.download({ name: fileName, extension: extension }) }}>Скачать</Button>
      </StandardGrid>
    </Center>
    <StandardGrid>
      <InputField type="text" title={textTitle} value={text} onChange={setText} />
      <InputField type="number" title={qrcodeTypeTitle} min={0} max={40} value={qrType.toString()} onChange={setQrType} />
      <CheckBox title={marginTitle} value={useMargin} onChange={toggleUseMargin} />
      <CheckBox title={customSettingsTitle} value={useCustomStyles} onChange={toggleUseCustomStyles} />
      {
        useCustomStyles && <>
          <CheckBox title={embedImageTitle} value={useImage} onChange={toggleUseImage} />
          <StandardGrid columns={1}>
            {
              useImage && <>
                <CheckBox
                  title={hideBackgroundDotsTitle}
                  value={hideBackgroundDots}
                  onChange={toggleHideBackgroundDots}
                />
                <InputField
                  type="text"
                  title={imageUrlTitle}
                  value={imageUrl}
                  onChange={setImageUrl}
                />
                <InputField
                  type="number"
                  title={imageSizeTitle}
                  value={imageSize.toString()}
                  onChange={setImageSize}
                  step={0.1}
                />
                <InputField
                  type="number"
                  title={imageMarginTitle}
                  value={imageMargin.toString()}
                  onChange={setImageMargin}
                />
              </>
            }
          </StandardGrid>
          <CheckBox title={backgroundOptionsTitle} value={useBackground} onChange={toggleUseBackground} />
          <StandardGrid columns={1}>
            {
              useBackground && <>
                <CheckBox title={gradientTitle} onChange={toggleUseBackgtoundGradient} value={useBackgroundGradient} />
                <InputField
                  type="text"
                  title={backgroundColorTitle}
                  value={backgroundColor}
                  onChange={color => { setBackgroundColor(color.hex) }}
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
          </StandardGrid>
          <CheckBox title={dotsStyleTitle} value={useDotsStyle} onChange={toggleUseDotsStyle} />
          <StandardGrid columns={1}>
            {
              useDotsStyle && <>
                <CheckBox title={gradientTitle} onChange={toggleUseDotsGradient} value={useDotsGradient} />
                <InputField
                  type="select"
                  title={dotsTypeTitle}
                  value={dotsType}
                  onChange={type => {
                    setDotsType(type as DotType)
                    !useCornerSquaresStyle && setCornerSquaresType(type as CornerSquareType)
                    !useCornerDotsStyle && setCornerDotsType(type as CornerDotType)
                  }}
                  options={dotsTypes}
                />
                <InputField
                  type="text"
                  title={dotsColorTitle}
                  value={dotsColor}
                  onChange={color => {
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
          </StandardGrid>
          <CheckBox title={cornerSquaresOptionsTitle} value={useCornerSquaresStyle} onChange={toggleUseCornerSquaresStyle} />
          <StandardGrid columns={1}>
            {
              useCornerSquaresStyle && <>
                <CheckBox title={gradientTitle} onChange={toggleUseCornerSquaresGradient} value={useCornerSquaresGradient} />
                <InputField
                  type="select"
                  title={cornerSquaresTypeTitle}
                  value={cornerSquaresType}
                  onChange={type => {
                    setCornerSquaresType(type as CornerSquareType)
                    !useCornerDotsStyle && setCornerDotsType(type as CornerDotType)
                  }}
                  options={cornerSquareTypes}
                />
                <InputField
                  type="text"
                  title={cornerSquaresColorTitle}
                  value={cornerSquaresColor}
                  onChange={color => {
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
          </StandardGrid>
          <CheckBox title={cornerDotsOptionsTitle} value={useCornerDotsStyle} onChange={toggleUseCornerDotsStyle} />
          <StandardGrid columns={1}>
            {
              useCornerDotsStyle && <>
                <CheckBox title={gradientTitle} onChange={toggleUseCornerDotsGradient} value={useCornerDotsGradient} />
                <InputField
                  type="select"
                  title={cornerDotsTypeTitle}
                  value={cornerDotsType}
                  onChange={type => { setCornerDotsType(type as CornerDotType) }}
                  options={cornerDotTypes}
                />
                <InputField
                  type="text"
                  title={cornerDotsColorTitle}
                  value={cornerDotsColor}
                  onChange={color => { setCornerDotsColor(color.hex) }}
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
          </StandardGrid>
        </>
      }
    </StandardGrid>
  </PageGenerator>
}
