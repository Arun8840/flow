import AuthLayout from "@/layouts/auth-layout"
import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  )
}
