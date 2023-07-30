import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { ciphers, converters, generators, pages, textTools } from "databases"
import { getDatabaseObject } from "features"
import Link from "next/link"
import { BsChevronRight } from "react-icons/bs"

export default function BreadCrumbs({ path }: { path: string[] }) {
  const titles = [pages, ciphers, converters, textTools, generators].map(database => database.map(({ name, title }) => ({ name, title }))).flat()

  return <Breadcrumb paddingY={2} separator={<BsChevronRight />}>
    {path}
    { path.map((pathPart, index) => pathPart === path.at(-1)
      ? <BreadcrumbItem key={pathPart} isCurrentPage>
        <BreadcrumbLink>{getDatabaseObject(titles, pathPart[0]?.toLowerCase() + pathPart.slice(1))?.title.split("(")[0] || pathPart}</BreadcrumbLink>
      </BreadcrumbItem>
      : <BreadcrumbItem key={pathPart}>
        <BreadcrumbLink
          as={Link}
          href={"/" + path.map(pathPart => pathPart.toLowerCase()).slice(0, index + 1).join("/")}
        >{getDatabaseObject(titles, pathPart[0].toLowerCase() + pathPart.slice(1))?.title.split("(")[0] || pathPart }</BreadcrumbLink>
      </BreadcrumbItem>)
    }
  </Breadcrumb>
}