export default function sort(a: string, b: string, useCaseSensitive: boolean) {
  const numberRegex = /(^-?\d+(\.\d*)[df]?e?\d?$|^0x[0-9a-f]+$|\d+)/gi

  a = (useCaseSensitive ? a : a.toLowerCase()).replace(" ", "")
  b = (useCaseSensitive ? b : b.toLowerCase()).replace(" ", "")

  if (!a) return b ? -1 : 0
  if (!b) return 1

  const separatedA = a.match(numberRegex) || [a]
  const separatedB = b.match(numberRegex) || [b]

  for (let index = 0; index < Math.max(separatedA.length, separatedB.length); index++) {
    const partA = separatedA[index]
    const partB = separatedB[index]

    const isNumericA = !isNaN(parseFloat(partA))
    const isNumericB = !isNaN(parseFloat(partB))

    if (isNumericA !== isNumericB) return isNumericA ? -1 : 1

    if (isNumericA && isNumericB) {
      const numericA = parseFloat(partA)
      const numericB = parseFloat(partB)

      if (numericA !== numericB) return numericA < numericB ? -1 : 1
    }

    if (partA !== partB) return partA < partB ? -1 : 1
  }

  return 0
}
