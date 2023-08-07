export default function getShuffled(array) {
  let currentIndex = array.length

  while (currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex)

    currentIndex--

    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
