import AuthLayout from "@/layouts/auth-layout"
import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  )
}
