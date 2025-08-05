import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { JSX, useState } from "react"

export const useConfirm = (
  title?: string | null | undefined,
  message?: string | null | undefined
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)

  const [isOpen, setIsOpen] = useState(false) // Add a state to control dialog visibility

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve })
      setIsOpen(true) // Open the dialog
    })
  }

  const handleClose = () => {
    setPromise(null)
    setIsOpen(false) // Close the dialog
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title || "Delete Confirmation"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {message || (
                <>
                  Are you sure you want to delete this item? This action is
                  permanent and cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-destructive text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return [ConfirmationDialog, confirm]
}
