import { ReactElement } from 'react';
import { useFormStoreValue } from 'efx-forms/react';

interface FormDataProviderProps {
  children: (value: any) => ReactElement;
  store: string;
}

export const FormDataProvider = ({ children, store }: FormDataProviderProps) => {
  const value = useFormStoreValue(store);
  return children(value);
};
