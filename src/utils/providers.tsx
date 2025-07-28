import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TRPCProvider } from "@/trpc/client"
import { ClerkProvider } from "@clerk/nextjs"
import React, { HTMLAttributes } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

interface ProvidersProps extends HTMLAttributes<HTMLDivElement> {}
const Providers: React.FC<ProvidersProps> = ({ children }) => {
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
