// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getReduced(array: { [key: string]: any }[]) {
  return array.reduce((prev, cur) => ({ ...prev, ...cur }))
}