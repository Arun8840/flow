import DesignLayout from "@/layouts/design-layout"
import "@xyflow/react/dist/style.css"
import React from "react"

const StandaloneLayout = ({ children }: { children: React.ReactNode }) => {
  return <DesignLayout>{children}</DesignLayout>
}

export default StandaloneLayout
