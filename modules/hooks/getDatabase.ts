import ky from "ky"
import { useEffect, useState } from "react"
export default function getDatabase(databaseName?) {

  const [ciphers, setCiphers] = useState([])
  useEffect(() => {
    ky("https://files.x1z53.ru/databases/ciphers.json").json()
      .then((res: []) => { setCiphers(res) })
      .catch(err => { console.error(err) })
  }, [])
  const database = { ciphers }

  return databaseName ? database[databaseName] : database
}

