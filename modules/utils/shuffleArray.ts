export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = newArray[j]
    newArray[j] = newArray[i]
    newArray[i] = temp
  }
  return newArray
}
