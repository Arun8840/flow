import { parseAsBoolean, useQueryState } from "nuqs"

interface CreateModalHookProps {
  queryLabel?: string | null
}
export const useGetCreate = ({ queryLabel }: CreateModalHookProps) => {
  const [isOpen, setIsOpen] = useQueryState(
    queryLabel || "create",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  )

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  }
}
