
// # Шифр Скитала
// def scytale_cipher(text, key):
//     matrix, row = [[] for _ in range(key)], 0

//     for i in range(len(text)):
//         matrix[row].append(text[i])
//         row = 0 if row == key-1 else row+1

//     return "".join([matrix[i][j] for i in range(key) for j in range(len(matrix[i])) if matrix[i][j]])

export default function Scytale(text, key, method) {
  const matrix = Array.from(Array(key), () => [])
  let row = 0

  for (let i = 0; i < text.length; i++) {
    matrix[row].push(text[i])
    row = (row + 1) % key
  }

  return method === "Encrypt" ? matrix.flat().join("") : "Work in progress"
}

