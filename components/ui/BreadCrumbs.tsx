import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import Link from "next/link"
import { BsChevronRight } from "react-icons/bs"

export default function BreadCrumbs({ path }: { path: string[] }) {
  return <Breadcrumb paddingY={2} separator={<BsChevronRight />}>
    {path.map((pathPart, index) => pathPart === path.at(-1)
      ? <BreadcrumbItem key={pathPart} isCurrentPage>
        <BreadcrumbLink>{pathPart}</BreadcrumbLink>
      </BreadcrumbItem>
      : <BreadcrumbItem key={pathPart}>
        <BreadcrumbLink
          as={Link}
          href={"/" + path.map(pathPart => pathPart.toLowerCase()).slice(0, index + 1).join("/")}
        >{pathPart}</BreadcrumbLink>
      </BreadcrumbItem>)
    }
  </Breadcrumb>
}