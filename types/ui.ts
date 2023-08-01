export type RouterProps = {
  path: string[], title: string[]
}
export type ModalProps = {
  isOpen: boolean,
  onClose: () => void
}

export type HeaderProps = RouterProps
export type BreadCrumbsProps = RouterProps
export type SidebarProps = ModalProps
export type LoginProps = ModalProps