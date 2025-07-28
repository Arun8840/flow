import { Button } from "@/components/ui/button"
import { useGetCreate } from "@/hooks/use-create-modal"
import { Plus } from "lucide-react"
import React from "react"

const ProjectCreateButton = () => {
  // *hook
  const { open } = useGetCreate({
    queryLabel: "create-project",
  })
  return (
    <>
      <Button onClick={open}>
        <Plus />
        Create New Project
      </Button>
    </>
  )
}

export default ProjectCreateButton
