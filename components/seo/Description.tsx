import Head from "next/head"
import { DescriptionProps } from "types"

export default function Description({description}: DescriptionProps) {
  return <Head>
    <meta name="description" content={description} />
  </Head>
}