"use client";
import React, { useRef, useState } from "react";
import { IKUpload } from "imagekitio-next";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";
import { Button } from "@/components/ui/button";
function Imageupload({ proceedSuccess }: { proceedSuccess?: IKUploadResponse }) {
  const [errors, setErrors] = useState<string | null>();
  const [isUploading, setIsuploading] = useState<boolean>(false);
  const ikUploadRefTest = useRef<any>(null);
  const onError = (err: UploadError) => {
    console.log("Error", err);
    setIsuploading(false);

    setErrors("Unexpected error");
  };

  const onSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setIsuploading(false);
  };
  const onUploadStart = () => {
    setIsuploading(true);
    setErrors(null);
  };

  return (
    <div className="flex">
      <IKUpload
        fileName="imageUpload.jpg"
        validateFile={(file) => file.size < 2000000}
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={onUploadStart}
        style={{ display: "none" }} // hide the default input and use the custom upload button
        ref={ikUploadRefTest}
      />
      <div className="flex gap-2 justify-between items-center">
        {ikUploadRefTest && (
          <Button onClick={() => ikUploadRefTest.current.click()}>
            Upload
          </Button>
        )}

        {ikUploadRefTest && (
          <Button onClick={() => ikUploadRefTest.current.abort()}>
            Abort request
          </Button>
        )}
      </div>
    </div>
  );
}

export default Imageupload;
