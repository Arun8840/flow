import Projects from "@/modules/projects"
import CreateProjectForm from "@/modules/projects/modal-forms/create-project-form"
import React from "react"

const page = () => {
  return (
    <>
      <Projects />
      <CreateProjectForm />
    </>
  )
}

export default page
