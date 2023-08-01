
export type CipherPageGeneratorProps = {
  name: string
  haveKey?: boolean
  numericKey?: boolean
  haveDecrypt?: boolean
  haveAlphabet?: boolean
}
export type PageGeneratorProps = {
  title: string,
  description?: string,
  children: React.ReactNode
}
export type ConverterPageGeneratorProps = {
  name: string
  defaultSourcBase: string
  defaultTargetBase: string
}