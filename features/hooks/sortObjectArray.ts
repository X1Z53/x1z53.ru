export default function sortObjectArray(array) {
  return array.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
} 