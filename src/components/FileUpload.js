import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUpload({ fileHandler }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    // accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  useEffect(() => {
    fileHandler(acceptedFiles);
    if (acceptedFiles.length) window.electron.notificationApi.sendNotification('File uploaded');
  }, [acceptedFiles, fileHandler])

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}