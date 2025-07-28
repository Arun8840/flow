"use client"

import { useParams } from "next/navigation"

export const useGetParamId = () => {
  const params = useParams()

  const projectId = params.projectId as string
  return {
    projectId,
  }
}
