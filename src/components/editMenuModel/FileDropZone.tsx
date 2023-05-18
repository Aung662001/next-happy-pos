import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onFileSelected }: Props) => {
  const [dropped, setDropped] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
    setDropped(true);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(undefined);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        textAlign: "center",
        p: 1,
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      ) : isDragActive ? (
        <p>{"Drop the file here ..."}</p>
      ) : (
        <p>
          {dropped
            ? "Selected "
            : "Drag 'n' drop an image file here, or click to select a file"}
        </p>
      )}
    </Box>
  );
};

export default FileDropZone;
