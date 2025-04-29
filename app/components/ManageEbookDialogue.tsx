"use client";

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
import { ebookSchema } from "../schemas/ebookSchema";
import FileUpload from "./Fileupload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useEffect, useState } from "react";
import LoaderComponent from "./Loader";
import { URLConsatnts } from "../libs/urlConstants";
import { postDataUsingServiceAndBodyData } from "../libs/apiClinet";
import { showToast } from "@/components/ui/toast";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: string;
  data?: any;
  onClose? : any;
};

type EbookFormData = z.infer<typeof ebookSchema>;

export function ManageEbookDialogue({ open, onOpenChange, mode, data  , onClose}: Props) {
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
      ebookFileUrl: "",
      ebookCoverImageUrl: "",
      author: "",
      pages: 50,
      price: 199,
    },
  });
  const [isLoading, setLoading] = useState(false);
  const onSubmit = async (reqBody: EbookFormData) => {
    console.log("Form Data: ", reqBody);
    const payload = mode === "edit" ? { ...reqBody, _id: data._id } : reqBody;
    try {
      setLoading(true);
      const res = await postDataUsingServiceAndBodyData(
        URLConsatnts.EbookApiUrl,
        payload
      );
      console.log(res);

      showToast({
        title: "Updated Successfully! 👍👍",
        variant: "success",
      });
      reset();
      onOpenChange(false);
      onClose(true)
    } catch (err: any) {
      showToast({
        title: `${err ? err.error + " 😔😔" : "Unexpected error 😔😔"}`,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  // Inside ManageEbookDialogue component...
  useEffect(() => {
    if (mode === "edit" && data) {
      reset({
        name: data.name || "",
        description: data.description || "",
        author: data.author || "",
        pages: data.pages || 0,
        price: data.price || 0,
        ebookFileUrl: data.ebookFileUrl || "",
        ebookCoverImageUrl: data.ebookCoverImageUrl || "",
      });
    } else if (mode === "add") {
      reset(); // Clear the form if it's add mode
    }
  }, [mode, data, reset]);
  const handleEbookUploadSuccess = (res: IKUploadResponse) => {
    setValue("ebookFileUrl", res.url, { shouldValidate: true });
  };
  const handleCoverImageUploadSuccess = (res: IKUploadResponse) => {
    console.log({ res });
    setValue("ebookCoverImageUrl", res.url, { shouldValidate: true });
  };

  return (
    <>
      <LoaderComponent show={isLoading} />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{mode === "edit" ? "Edit" : "Add"} E-Book</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            className="space-y-4"
          >
            <div>
              <Label>Book Name</Label>
              <Input className="border-black" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea className="border-black" {...register("description")} />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <Label>Author</Label>
              <Input className="border-black" {...register("author")} />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Pages</Label>
                <Input
                  className="border-black"
                  {...register("pages", { valueAsNumber: true })}
                />
                {errors.pages && (
                  <p className="text-red-500 text-sm">{errors.pages.message}</p>
                )}
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  className="border-black"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>
            <div>
              {mode === "edit" && data?.ebookFileUrl && (
                <div className="mb-2">
                  <Label>Current Ebook File:</Label>
                  <a
                    href={data.ebookFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download Ebook
                  </a>
                </div>
              )}
              <Label>Select Ebook</Label>
              <div className="border-2 border-dashed border-black rounded-sm py-6 pl-3">
                <FileUpload
                  onSuccess={handleEbookUploadSuccess}
                  fileType="ebook"
                />
              </div>
            </div>
            <div>
              {mode === "edit" && data?.ebookCoverImageUrl && (
                <div className="mb-2">
                  <Label>Current Cover Image:</Label>
                  <img
                    src={data.ebookCoverImageUrl}
                    alt="Cover"
                    className="w-32 h-40 object-cover border"
                  />
                </div>
              )}
              <Label>Select Cover Image</Label>
              <div className="border-2 border-dashed border-black rounded-sm py-6 pl-3">
                <FileUpload
                  onSuccess={handleCoverImageUploadSuccess}
                  fileType="image"
                />
              </div>
            </div>
            <input type="hidden" {...register("ebookFileUrl")} />
            <input type="hidden" {...register("ebookCoverImageUrl")} />

            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
