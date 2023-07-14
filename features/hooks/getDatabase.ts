import { useQuery } from "@tanstack/react-query"
import { sortObjectArray } from "features/hooks"
import ky from "ky"

export default function getDatabase(databaseName: string) {
  return useQuery({
    queryKey: [databaseName],
    queryFn: async () => {
      const data: [] = await ky(`https://files.x1z53.ru/databases/${databaseName}.json`).json()
      return sortObjectArray(data)
    }
  })
}

