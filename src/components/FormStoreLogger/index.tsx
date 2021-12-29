import { useEffect } from 'react';
import { useFormStoreValue } from 'efx-forms/react';

interface StoreLoggerProps {
  store: string;
}

export const FormStoreLogger = ({ store }: StoreLoggerProps) => {
  const values = useFormStoreValue(store);
  useEffect(() => {
    console.log(`FORM_STORE - ${store}: `, values);
  }, [store, values]);
  return null;
};
