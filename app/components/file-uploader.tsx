import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

export const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[ 0 ] || null;

      onFileSelect?.(file);
    },
    [ onFileSelect ]
  );

  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [ ".pdf" ] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[ 0 ] || null;

  return (
    <div className="gradient-border w-full">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="cursor-pointer space-y-4">
          {file ? (
            <div className="uploader-selected-file">
              <img alt="pdf" className="size-10" src="/images/pdf.png" />

              <div className="flex items-center space-x-3">
                <div>
                  <p className="max-w-xs truncate font-medium text-gray-700 text-sm">
                    {file.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                className="cursor-pointer p-2"
                onClick={() => {
                  onFileSelect?.(null);
                }}
                type="button"
              >
                <img alt="remove" className="size-4" src="/icons/cross.svg" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto mb-2 flex size-16 items-center justify-center">
                <img alt="upload" className="size-20" src="/icons/info.svg" />
              </div>
              <p className="text-gray-500 text-lg">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-gray-500 text-lg">
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
