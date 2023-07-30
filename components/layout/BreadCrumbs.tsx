import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import Link from "next/link"
import { BsChevronRight } from "react-icons/bs"

export default function BreadCrumbs({ path, title }: { path: string[], title: string[] }) {
  console.log(path, title)
  return <Breadcrumb whiteSpace="nowrap" overflow="auto" paddingY={2} separator={<BsChevronRight />}>
    {
      title.map(
        (titlePart, index) => index === title.length - 1
          ? <BreadcrumbItem key={titlePart} isCurrentPage>
            <BreadcrumbLink>
              {titlePart}
            </BreadcrumbLink>
          </BreadcrumbItem>
          : <BreadcrumbItem key={titlePart}>
            <BreadcrumbLink
              as={Link}
              href={"/" + path.slice(0, index + 1).join("/")}
            >
              {titlePart}
            </BreadcrumbLink>
          </BreadcrumbItem>
      )
    }
  </Breadcrumb>
}