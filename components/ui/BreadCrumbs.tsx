import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { BsChevronRight } from "react-icons/bs"
import { BreadCrumbsProps } from "types"

export default function BreadCrumbs({ title, path }: BreadCrumbsProps) {
  return (
    <>
      <Breadcrumb
        whiteSpace="nowrap"
        overflow="auto"
        paddingY={2}
        separator={<BsChevronRight />}
      >
        {title.map((titlePart, index) =>
          index === title.length - 1 ? (
            <BreadcrumbItem key={titlePart} isCurrentPage>
              <BreadcrumbLink>
                <Text fontWeight="medium">{titlePart}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={titlePart}>
              <BreadcrumbLink
                as={Link}
                href={"/" + path.slice(0, index + 1).join("/")}
              >
                <Text fontWeight="medium">{titlePart}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ),
        )}
      </Breadcrumb>
    </>
  )
}
