import React from 'react'
import { Button } from "@/components/ui/button"
import Imageupload from './components/Imageupload'
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props'
function page() {


  return (

    
    <div className='flex justify-center items-center'>
      <Imageupload ></Imageupload>
    </div>
   
  )
}

export default page