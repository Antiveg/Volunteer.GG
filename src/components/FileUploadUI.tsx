"use client"
import React from "react";
import { FileUpload } from "./ui/file-upload";

type FileUploadUIProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const FileUploadUI = ({ setFiles } : FileUploadUIProps) => {
  
  const handleFileUpload = (files: File[]) => {
    setFiles(files)
  }
 
  return (
    <div className="w-full mx-auto min-h-24 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg bg-gray-100/25">
      <FileUpload onChange={handleFileUpload} />
    </div>
  )
}

export default FileUploadUI