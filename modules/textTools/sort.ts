
export default function sort(a, b, useCaseSensitive) {
  a = useCaseSensitive ? a.toLowerCase().split(/(\d+)/) : a.split(/(\d+)/)
  b = useCaseSensitive ? b.toLowerCase().split(/(\d+)/) : b.split(/(\d+)/)

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] === b[i]) continue

    const aChunk = parseInt(a[i])
    const bChunk = parseInt(b[i])

    if (isNaN(aChunk) || isNaN(bChunk)) return a[i] > b[i] ? 1 : -1
    return aChunk - bChunk
  }

  return 0
}
