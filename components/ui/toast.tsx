// lib/toast.ts
"use client"
import { toast } from "sonner"

type Variant = "success" | "error" | "info" | "warning"

export function showToast({
  title,
  description,
  variant = "info",
}: {
  title: string
  description?: string
  variant?: Variant
}) {
  const colors: Record<Variant, string> = {
    success: "bg-green-50 border-green-500 text-green-700",
    error: "bg-red-50 border-red-500 text-red-700",
    info: "bg-blue-50 border-blue-500 text-blue-700",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-700",
  }

  toast(title, {
    description,
    className: `border-l-4 p-4 ${colors[variant]}`,
  })
}
