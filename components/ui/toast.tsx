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
    success: "bg-green-50 border-green-500 text-green-400",
    error: "bg-red-50 border-red-500 text-red-400",
    info: "bg-blue-50 border-blue-500 text-info-400",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-400",
  }
  const borderColor :Record<Variant, string> ={
    success: "border-s-green-300",
    error: "border-s-red-300",
    info: "border-s-blue-300",
    warning: "border-s-yellow-300",
  } 

  toast.custom(() => (
    <div className={`${borderColor[variant]}  p-4 rounded-sm shadow ${colors[variant]}`}>
      <div className="font-semibold">{title}</div>
      {description && (
        <div className="text-sm text-muted-foreground mt-1">{description}</div>
      )}
    </div>
  ))
}
