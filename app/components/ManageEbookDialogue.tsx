import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ebookSchema } from "../schemas/ebookSchema";
import FileUpload from "./Fileupload";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: string;
};

type EbookFormData = z.infer<typeof ebookSchema>;

export function ManageEbookDialogue({ open, onOpenChange, mode }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EbookFormData>({
    resolver: zodResolver(ebookSchema),
    defaultValues: {
      name: "",
      description: "",
      fileUrl: "",
      fileType: "pdf",
      pages: 50,
      price: 199,
    },
  });

  const onSubmit = (data: EbookFormData) => {
    console.log("Form Data: ", data);
    onOpenChange(false);
  };

  const handleUploadSuccess = () => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[700px] sm:max-w-full">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit" : "Add"} E-Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input  className="border-black" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea  className="border-black" {...register("description")} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Pages</Label>
              <Input className="border-black" {...register("pages", { valueAsNumber: true })} />
              {errors.pages && (
                <p className="text-red-500 text-sm">{errors.pages.message}</p>
              )}
            </div>

            <div>
              <Label>Price</Label>
              <Input   className="border-black" {...register("price", { valueAsNumber: true })} />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label>Select Ebook</Label>
            <div className="border-2 border-dashed border-black rounded-sm py-6 pl-3">
              <FileUpload onSuccess={handleUploadSuccess} fileType="ebook" />
            </div>
          </div>
          <div>
            <Label>Select Cover Image</Label>
            <div className="border-2 border-dashed border-black rounded-sm py-6 pl-3">
              <FileUpload onSuccess={handleUploadSuccess} fileType="image" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
