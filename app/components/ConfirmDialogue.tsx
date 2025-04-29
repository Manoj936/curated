'use client'
import { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ConfirmDialogOptions = {
  title?: string;
  description?: string;
  onConfirm: () => void;
};

export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const options = useRef<ConfirmDialogOptions | null>(null);

  const show = (opts: ConfirmDialogOptions) => {
    options.current = opts;
    setOpen(true);
  };

  const ConfirmDialog = () => (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.current?.title || "Are you sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {options.current?.description || "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              options.current?.onConfirm();
              setOpen(false);
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return { show, ConfirmDialog };
}
