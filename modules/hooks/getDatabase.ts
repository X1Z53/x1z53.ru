import ky from "ky"
import { sortObjectArray } from "modules/hooks"
import { useEffect, useState } from "react"

export default function getDatabase(databaseName?): any {
  const [database, setDatabase] = useState([])
  useEffect(() => {
    ky(`https://files.x1z53.ru/databases/${databaseName}.json`).json()
      .then((res: []) => { setDatabase(res) })
      .catch(err => { console.error(err) })
  }, [])

  return sortObjectArray(database)
}

