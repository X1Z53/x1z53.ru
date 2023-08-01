export type CipherPageGeneratorProps = {
  name: string
  haveKey?: boolean
  numericKey?: boolean
  haveDecrypt?: boolean
  haveAlphabet?: boolean
}
export type PageGeneratorProps = {
  name: string,
  database: any,
  children: React.ReactNode
}
export type ConverterPageGeneratorProps = {
  name: string
  defaultSourcBase: string
  defaultTargetBase: string
}