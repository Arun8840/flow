import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function NotFound() {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center gap-4">
      <code className="text-6xl font-bold text-red-500">404</code>
      <h2 className="text-3xl font-bold">Oops! Page Not Found</h2>
      <p className="text-lg">
        We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t
        exist.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex bg-primary font-medium text-secondary py-2 px-4 rounded-full items-center gap-2"
      >
        <ArrowLeft /> Return Home
      </Link>
    </section>
  )
}
