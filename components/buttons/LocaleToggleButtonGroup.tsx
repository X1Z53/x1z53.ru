import { LinkOverlay } from "@chakra-ui/react"
import { ToggleButtonGroup } from "components"
import Link from "next/link"
import { useRouter } from "next/router"

export default function LocaleToggleButtonGroup() {
  const { locales } = useRouter()

  return (
    <ToggleButtonGroup
      buttons={locales.map((locale) => (
        <LinkOverlay as={Link} href="" {...{ locale }} key={locale}>
          {locale.toUpperCase()}
        </LinkOverlay>
      ))}
      noSelect
      noAdaptive
      onChange={() => {}}
    />
  )
}
