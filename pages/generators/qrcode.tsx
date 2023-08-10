import { Box, Button, Center } from "@chakra-ui/react"
import { CheckBox, InputField, PageGenerator, StandardGrid } from "components"
import { generators } from "databases"
import { getLocaledTitles, useToggle } from "modules"
import {
  CornerDotType,
  CornerSquareType,
  DotType,
  GradientType,
  TypeNumber,
} from "qr-code-styling"
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
  type,
}: GradientSettingsProps) {
  const titles = getLocaledTitles()
  const types = ["linear", "radial"]

  return (
    <>
      {useGradient && (
        <>
          <InputField
            type="number"
            title={titles.firstColorOffset}
            value={colorOffset[0].toString()}
            onChange={colorOffset[1]}
            step={0.1}
            min={0}
            max={1}
          />
          <InputField
            type="text"
            title={titles.gradientColor}
            value={secondColor[0]}
            onChange={(color) => {
              secondColor[1](color.hex)
            }}
            colorPickerButton
            readOnly
          />
          <InputField
            type="number"
            title={titles.gradientColorOffset}
            value={secondColorOffset[0].toString()}
            onChange={secondColorOffset[1]}
            step={0.1}
            min={0}
            max={1}
          />
          <InputField
            type="number"
            title={titles.gradientRotation}
            value={rotation[0].toString()}
            onChange={rotation[1]}
            step={0.1}
            min={0}
            max={6.3}
          />
          <InputField
            type="select"
            title={titles.gradientType}
            value={type[0]}
            options={types}
            onChange={type[1]}
          />
        </>
      )}
    </>
  )
}

export default function QRCode() {
  const titles = getLocaledTitles()

  const [text, setText] = useState("Hello, World!")
  const [qrType, setQrType] = useState<TypeNumber>(0)
  const [useMargin, toggleUseMargin] = useToggle(true)

  const [useCustomStyles, toggleUseCustomStyles] = useToggle(false)

  const [
    [useImage, toggleUseImage],
    [imageUrl, setImageUrl],
    [hideBackgroundDots, toggleHideBackgroundDots],
    [imageSize, setImageSize],
    [imageMargin, setImageMargin],
  ] = [
    useToggle(false),
    useState("https://x1z53.ru/x1z53.svg"),
    useToggle(true),
    useState(0.4),
    useState(5),
  ]

  const [
    [useBackground, toggleUseBackground],
    [useBackgroundGradient, toggleUseBackgtoundGradient],
    [backgroundColor, setBackgroundColor],
    [backgroundColorOffset, setBackgroundColorOffset],
    [backgroundGradientType, setBackgroundGradientType],
    [backgroundRotation, setBackgroundRotation],
    [backgroundSecondColor, setBackgroundSecondColor],
    [backgroundSecondColorOffset, setBackgroundSecondColorOffset],
  ] = [
    useToggle(false),
    useToggle(false),
    useState("#1a202c"),
    useState(0),
    useState<GradientType>("linear"),
    useState(0),
    useState("#1a202c"),
    useState(1),
  ]

  const dotsTypes = [
    "classy",
    "classy-rounded",
    "dots",
    "extra-rounded",
    "rounded",
    "square",
  ]
  const [
    [useDotsStyle, toggleUseDotsStyle],
    [useDotsGradient, toggleUseDotsGradient],
    [dotsType, setDotsType],
    [dotsGradientType, setDotsGradientType],
    [dotsRotation, setDotsRotation],
    [dotsColor, setDotsColor],
    [dotsColorOffset, setDotsColorOffset],
    [dotsSecondColor, setDotsSecondColor],
    [dotsSecondColorOffset, setDotsSecondColorOffset],
  ] = [
    useToggle(false),
    useToggle(false),
    useState<DotType>("square"),
    useState<GradientType>("linear"),
    useState(0),
    useState("#ffffff"),
    useState(0),
    useState("#ffffff"),
    useState(1),
  ]

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
    [cornerSquaresSecondColorOffset, setCornerSquaresSecondColorOffset],
  ] = [
    useToggle(false),
    useToggle(false),
    useState<CornerSquareType>("square"),
    useState<GradientType>(dotsGradientType),
    useState(dotsRotation),
    useState(dotsColor),
    useState(dotsColorOffset),
    useState(dotsSecondColor),
    useState(dotsSecondColorOffset),
  ]

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
    [cornerDotsSecondColorOffset, setCornerDotsSecondColorOffset],
  ] = [
    useToggle(false),
    useToggle(false),
    useState<CornerDotType>("square"),
    useState<GradientType>(cornerSquaresGradientType),
    useState(cornerSquaresRotation),
    useState(cornerSquaresColor),
    useState(cornerSquaresColorOffset),
    useState(cornerSquaresSecondColor),
    useState(cornerSquaresSecondColorOffset),
  ]

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
                {
                  offset: backgroundSecondColorOffset,
                  color: useBackgroundGradient
                    ? backgroundSecondColor
                    : backgroundColor,
                },
              ],
            },
          },
          dotsOptions: {
            type: dotsType,
            gradient: {
              type: dotsGradientType,
              rotation: dotsRotation,
              colorStops: [
                { offset: dotsColorOffset, color: dotsColor },
                {
                  offset: dotsSecondColorOffset,
                  color: useDotsGradient ? dotsSecondColor : dotsColor,
                },
              ],
            },
          },
          cornersSquareOptions: {
            type: cornerSquaresType,
            gradient: {
              type: cornerSquaresGradientType,
              rotation: cornerSquaresRotation,
              colorStops: [
                { offset: cornerSquaresColorOffset, color: cornerSquaresColor },
                {
                  offset: cornerSquaresSecondColorOffset,
                  color: useCornerSquaresGradient
                    ? cornerSquaresSecondColor
                    : cornerSquaresColor,
                },
              ],
            },
          },
          cornersDotOptions: {
            type: cornerDotsType,
            gradient: {
              type: cornerDotsGradientType,
              rotation: cornerDotsRotation,
              colorStops: [
                { offset: cornerDotsColorOffset, color: cornerDotsColor },
                {
                  offset: cornerDotsSecondColorOffset,
                  color: useCornerDotsGradient
                    ? cornerDotsSecondColor
                    : cornerDotsColor,
                },
              ],
            },
          },
        })
        qrCode.append(ref.current)
        qrCode.update({ data: text })
      })
    }
  }, [
    text,
    qrType,
    useMargin,
    fileName,
    extension,
    useImage,
    imageUrl,
    hideBackgroundDots,
    imageSize,
    imageMargin,
    useBackgroundGradient,
    backgroundColor,
    backgroundColorOffset,
    backgroundGradientType,
    backgroundRotation,
    backgroundSecondColor,
    backgroundSecondColorOffset,
    dotsType,
    useDotsGradient,
    dotsColor,
    dotsColorOffset,
    dotsGradientType,
    dotsRotation,
    dotsSecondColor,
    dotsSecondColorOffset,
    cornerSquaresType,
    useCornerSquaresGradient,
    cornerSquaresColor,
    cornerSquaresColorOffset,
    cornerSquaresGradientType,
    cornerSquaresRotation,
    cornerSquaresSecondColor,
    cornerSquaresSecondColorOffset,
    cornerDotsType,
    useCornerDotsGradient,
    cornerDotsColor,
    cornerDotsColorOffset,
    cornerDotsGradientType,
    cornerDotsRotation,
    cornerDotsSecondColor,
    cornerDotsSecondColorOffset,
  ])

  return (
    <PageGenerator database={generators} name="qrcode">
      <Center>
        <StandardGrid columns={1}>
          <Center>
            <Box ref={ref} />
          </Center>
          <InputField
            title={titles.file}
            styles={{ width: "auto" }}
            type="group"
          >
            <InputField
              value={fileName}
              onChange={setFileName}
              type="text"
              styles={{ borderRightRadius: "0" }}
            />
            <InputField
              type="select"
              options={extensions}
              value={extension}
              onChange={setExtension}
            />
          </InputField>
          <Button
            onClick={() => {
              qrCode.download({ name: fileName, extension: extension })
            }}
          >
            Скачать
          </Button>
        </StandardGrid>
      </Center>
      <StandardGrid>
        <InputField
          type="text"
          title={titles.text}
          value={text}
          onChange={setText}
        />
        <InputField
          type="number"
          title={titles.qrcodeType}
          min={0}
          max={40}
          value={qrType.toString()}
          onChange={setQrType}
        />
        <CheckBox
          title={titles.marginsAtEdges}
          value={useMargin}
          onChange={toggleUseMargin}
        />
        <CheckBox
          title={titles.additionalOptions}
          value={useCustomStyles}
          onChange={toggleUseCustomStyles}
        />
        {useCustomStyles && (
          <>
            <CheckBox
              title={titles.embedImage}
              value={useImage}
              onChange={toggleUseImage}
            />
            <StandardGrid columns={1}>
              {useImage && (
                <>
                  <CheckBox
                    title={titles.hideBackgroundDots}
                    value={hideBackgroundDots}
                    onChange={toggleHideBackgroundDots}
                  />
                  <InputField
                    type="text"
                    title={titles.imageUrl}
                    value={imageUrl}
                    onChange={setImageUrl}
                  />
                  <InputField
                    type="number"
                    title={titles.imageSize}
                    value={imageSize.toString()}
                    onChange={setImageSize}
                    step={0.1}
                  />
                  <InputField
                    type="number"
                    title={titles.imageMargins}
                    value={imageMargin.toString()}
                    onChange={setImageMargin}
                  />
                </>
              )}
            </StandardGrid>
            <CheckBox
              title={titles.backgroundOptions}
              value={useBackground}
              onChange={toggleUseBackground}
            />
            <StandardGrid columns={1}>
              {useBackground && (
                <>
                  <CheckBox
                    title={titles.useGradient}
                    onChange={toggleUseBackgtoundGradient}
                    value={useBackgroundGradient}
                  />
                  <InputField
                    type="text"
                    title={titles.backgroundColor}
                    value={backgroundColor}
                    onChange={(color) => {
                      setBackgroundColor(color.hex)
                    }}
                    colorPickerButton
                    readOnly
                  />
                  <GradientSettings
                    colorOffset={[
                      backgroundColorOffset,
                      setBackgroundColorOffset,
                    ]}
                    rotation={[backgroundRotation, setBackgroundRotation]}
                    secondColor={[
                      backgroundSecondColor,
                      setBackgroundSecondColor,
                    ]}
                    secondColorOffset={[
                      backgroundSecondColorOffset,
                      setBackgroundSecondColorOffset,
                    ]}
                    type={[backgroundGradientType, setBackgroundGradientType]}
                    useGradient={useBackgroundGradient}
                  />
                </>
              )}
            </StandardGrid>
            <CheckBox
              title={titles.dotsOptions}
              value={useDotsStyle}
              onChange={toggleUseDotsStyle}
            />
            <StandardGrid columns={1}>
              {useDotsStyle && (
                <>
                  <CheckBox
                    title={titles.useGradient}
                    onChange={toggleUseDotsGradient}
                    value={useDotsGradient}
                  />
                  <InputField
                    type="select"
                    title={titles.dotsType}
                    value={dotsType}
                    onChange={(type) => {
                      setDotsType(type as DotType)
                      !useCornerSquaresStyle &&
                        setCornerSquaresType(type as CornerSquareType)
                      !useCornerDotsStyle &&
                        setCornerDotsType(type as CornerDotType)
                    }}
                    options={dotsTypes}
                  />
                  <InputField
                    type="text"
                    title={titles.dotsColor}
                    value={dotsColor}
                    onChange={(color) => {
                      setDotsColor(color.hex)
                      !useCornerSquaresStyle && setCornerSquaresColor(color.hex)
                      !useCornerDotsStyle && setCornerDotsColor(color.hex)
                    }}
                    colorPickerButton
                    readOnly
                  />
                  <GradientSettings
                    colorOffset={[
                      dotsColorOffset,
                      (value) => {
                        setDotsColorOffset(value)
                        !useCornerSquaresStyle &&
                          setCornerSquaresColorOffset(value)
                        !useCornerDotsStyle &&
                          setCornerSquaresColorOffset(value)
                      },
                    ]}
                    rotation={[
                      dotsRotation,
                      (value) => {
                        setDotsRotation(value)
                        !useCornerSquaresStyle &&
                          setCornerSquaresRotation(value)
                        !useCornerDotsStyle && setCornerDotsRotation(value)
                      },
                    ]}
                    secondColor={[
                      dotsSecondColor,
                      (value) => {
                        setDotsSecondColor(value)
                        !useCornerSquaresStyle &&
                          setCornerSquaresSecondColor(value)
                        !useCornerDotsStyle && setCornerDotsSecondColor(value)
                      },
                    ]}
                    secondColorOffset={[
                      dotsSecondColorOffset,
                      (value) => {
                        setDotsSecondColorOffset(value)
                        !useCornerSquaresStyle &&
                          setCornerSquaresSecondColorOffset(value)
                        !useCornerDotsStyle &&
                          setCornerDotsSecondColorOffset(value)
                      },
                    ]}
                    type={[
                      dotsGradientType,
                      (value) => {
                        setDotsGradientType(value)
                        !useCornerSquaresStyle &&
                          setCornerSquaresGradientType(value)
                        !useCornerDotsStyle && setCornerDotsGradientType(value)
                      },
                    ]}
                    useGradient={useDotsGradient}
                  />
                </>
              )}
            </StandardGrid>
            <CheckBox
              title={titles.cornerSquaresOptions}
              value={useCornerSquaresStyle}
              onChange={toggleUseCornerSquaresStyle}
            />
            <StandardGrid columns={1}>
              {useCornerSquaresStyle && (
                <>
                  <CheckBox
                    title={titles.useGradient}
                    onChange={toggleUseCornerSquaresGradient}
                    value={useCornerSquaresGradient}
                  />
                  <InputField
                    type="select"
                    title={titles.cornerSquaresType}
                    value={cornerSquaresType}
                    onChange={(type) => {
                      setCornerSquaresType(type as CornerSquareType)
                      !useCornerDotsStyle &&
                        setCornerDotsType(type as CornerDotType)
                    }}
                    options={cornerSquareTypes}
                  />
                  <InputField
                    type="text"
                    title={titles.cornerSquaresColor}
                    value={cornerSquaresColor}
                    onChange={(color) => {
                      setCornerSquaresColor(color.hex)
                      !useCornerDotsStyle && setCornerDotsColor(color.hex)
                    }}
                    colorPickerButton
                    readOnly
                  />
                  <GradientSettings
                    colorOffset={[
                      cornerSquaresColorOffset,
                      (value) => {
                        setCornerSquaresColorOffset(value)
                        !useCornerDotsStyle && setCornerDotsColorOffset(value)
                      },
                    ]}
                    rotation={[
                      cornerSquaresRotation,
                      (value) => {
                        setCornerSquaresRotation(value)
                        !useCornerDotsStyle && setCornerDotsRotation(value)
                      },
                    ]}
                    secondColor={[
                      cornerSquaresSecondColor,
                      (value) => {
                        setCornerSquaresSecondColor(value)
                        !useCornerDotsStyle && setCornerDotsSecondColor(value)
                      },
                    ]}
                    secondColorOffset={[
                      cornerSquaresSecondColorOffset,
                      (value) => {
                        setCornerSquaresSecondColorOffset(value)
                        !useCornerDotsStyle &&
                          setCornerDotsSecondColorOffset(value)
                      },
                    ]}
                    type={[
                      cornerSquaresGradientType,
                      (value) => {
                        setCornerSquaresGradientType(value)
                        !useCornerDotsStyle && setCornerDotsGradientType(value)
                      },
                    ]}
                    useGradient={useCornerSquaresGradient}
                  />
                </>
              )}
            </StandardGrid>
            <CheckBox
              title={titles.cornerDotsOptions}
              value={useCornerDotsStyle}
              onChange={toggleUseCornerDotsStyle}
            />
            <StandardGrid columns={1}>
              {useCornerDotsStyle && (
                <>
                  <CheckBox
                    title={titles.useGradient}
                    onChange={toggleUseCornerDotsGradient}
                    value={useCornerDotsGradient}
                  />
                  <InputField
                    type="select"
                    title={titles.cornerDotsType}
                    value={cornerDotsType}
                    onChange={(type) => {
                      setCornerDotsType(type as CornerDotType)
                    }}
                    options={cornerDotTypes}
                  />
                  <InputField
                    type="text"
                    title={titles.cornerDotsColor}
                    value={cornerDotsColor}
                    onChange={(color) => {
                      setCornerDotsColor(color.hex)
                    }}
                    colorPickerButton
                    readOnly
                  />
                  <GradientSettings
                    colorOffset={[
                      cornerDotsColorOffset,
                      setCornerDotsColorOffset,
                    ]}
                    rotation={[cornerDotsRotation, setCornerDotsRotation]}
                    secondColor={[
                      cornerDotsSecondColor,
                      setCornerDotsSecondColor,
                    ]}
                    secondColorOffset={[
                      cornerDotsSecondColorOffset,
                      setCornerDotsSecondColorOffset,
                    ]}
                    type={[cornerDotsGradientType, setCornerDotsGradientType]}
                    useGradient={useCornerDotsGradient}
                  />
                </>
              )}
            </StandardGrid>
          </>
        )}
      </StandardGrid>
    </PageGenerator>
  )
}
