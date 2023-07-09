import { useRouter } from "next/router"

export default function getUrl() {
  return useRouter().query
}