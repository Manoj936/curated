// components/ReusableAlert.tsx
'use client'

import React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

interface ReusableAlertProps {
  title: string
  description: string
  triggerText?: React.ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  successMessage?: string
}

const ReusableAlert: React.FC<ReusableAlertProps> = ({
  title,
  description,
  triggerText = "Open",
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm,
  successMessage = "Action completed successfully",
}) => {
  const handleConfirm = () => {
    onConfirm?.()
    toast({
      title: "Success",
      description: successMessage,
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-blue-600 hover:underline">{triggerText}</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ReusableAlert
