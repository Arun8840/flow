import { Button } from "@/components/ui/button"
import { useGetCreate } from "@/hooks/use-create-modal"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import React from "react"

type ProjectCreateButtonProps = {
  type?: "float" | "normal"
}
const ProjectCreateButton: React.FC<ProjectCreateButtonProps> = ({
  type = "normal",
}) => {
  // *hook
  const { open } = useGetCreate({
    queryLabel: "create-project",
  })

  const buttonType = {
    float: "fixed right-10  bottom-10 z-50 size-10",
    normal: "",
  }

  const baseClass = ""
  const customClass = buttonType[type]
  return (
    <>
      <Button
        className={cn(baseClass, customClass, "cursor-pointer")}
        onClick={open}
      >
        <Plus />
        {type !== "float" && "Create New Project"}
      </Button>
    </>
  )
}

export default ProjectCreateButton
