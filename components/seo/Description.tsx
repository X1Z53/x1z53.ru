import Head from "next/head"

export default function Description({description}: {description: string}) {
  return <Head>
    <meta name="description" content={description} />
  </Head>
}