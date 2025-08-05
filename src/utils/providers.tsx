import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TRPCProvider } from "@/trpc/client"
import { ClerkProvider } from "@clerk/nextjs"
import React, { HTMLAttributes } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

const Providers: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return (
    <>
      <ClerkProvider>
        <TRPCProvider>
          <NuqsAdapter>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
            </ThemeProvider>
          </NuqsAdapter>
        </TRPCProvider>
      </ClerkProvider>
    </>
  )
}

export default Providers
