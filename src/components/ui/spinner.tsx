import React, { HTMLAttributes } from "react"
import { LoaderCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  message?: string | null | undefined
}
const Spinner: React.FC<SpinnerProps> = ({ className, message }) => {
  const baseClass = "text-primary animate-spin"
  return (
    <div className="grid place-items-center">
      <div className="flex items-center gap-2">
        <LoaderCircle size={18} className={cn(baseClass, className)} />
        {message && <span>{message}</span>}
      </div>
    </div>
  )
}

export default Spinner
