"use client";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const mimeTypeMap: Record<"image" | "ebook", string[]> = {
  image: ["image/jpeg", "image/png", "image/webp"],
  ebook: ["application/pdf", "application/epub+zip"],
};

export default function FileUpload({
  onSuccess,
  fileType,
}: {
  onSuccess: (res: IKUploadResponse) => void;
  fileType: "ebook" | "image";
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName="product-image.jpg"
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        className="file-input file-input-bordered w-full"
        validateFile={(file: File) => {
          // Validate file type and size
          let validTypes;
          if (fileType === "image") {
            validTypes = mimeTypeMap.image;
            if (!validTypes.includes(file.type)) {
              setError("Please upload a valid image file (JPEG, PNG, or WebP)");
              return false;
            }
            if (file.size > 2 * 1024 * 1024) {
              // 5MB limit
              setError("File size must be less than 2MB");
              return false;
            }
          }
          if (fileType === "ebook") {
            validTypes = mimeTypeMap.ebook;
            if (!validTypes.includes(file.type)) {
              setError("Please upload a valid image file (pdf or epud)");
              return false;
            }
            if (file.size > 25 * 1024 * 1024) {
              // 5MB limit
              setError("File size must be less than 25MB");
              return false;
            }
          }
          return true;
        }}
      />

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading...</span>
        </div>
      )}

      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
}
