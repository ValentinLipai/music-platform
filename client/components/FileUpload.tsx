import { useRef } from 'react';

interface iFileUploadProps extends React.PropsWithChildren {
  setFile: (file: File) => void;
  accept: string;
}
export const FileUpload: React.FC<iFileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div onClick={() => ref.current?.click()}>
      <input
        ref={ref}
        type="file"
        name="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      {children}
    </div>
  );
};

export default FileUpload;
