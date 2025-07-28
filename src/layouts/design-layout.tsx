import DashboardNav from "@/modules/dashboard/components/dashboard-nav"
import DesignToolSidemenu from "@/modules/design/components/design-tool-menu"
import React from "react"

const DesignLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="size-full h-screen flex">
      <DesignToolSidemenu />
      <main className="flex-1 flex flex-col">
        <DashboardNav showSidebarTrigger={true} />
        {children}
      </main>
    </section>
  )
}

export default DesignLayout
