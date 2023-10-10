import { useState } from 'react';

export type IUseInputExport = [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (value: ((prevState: string) => string) | string) => void,
];

export const useInput = (initialValue: string): IUseInputExport => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, onChange, setValue];
};
