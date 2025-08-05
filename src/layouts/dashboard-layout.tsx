import DashboardNav from "@/modules/dashboard/components/dashboard-nav"

import React from "react"
import { Toaster } from "sonner"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-lvh size-full flex bg-stone-50 dark:bg-inherit">
      <main className="size-full flex-1 flex flex-col">
        <DashboardNav />
        <div className="p-2 flex-1">{children}</div>
      </main>
      <Toaster />
    </div>
  )
}

export default DashboardLayout
