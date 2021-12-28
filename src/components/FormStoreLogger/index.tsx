import { useEffect } from 'react';
import { useFormStore } from 'efx-forms/react';

interface StoreLoggerProps {
  store: string;
}

export const FormStoreLogger = ({ store }: StoreLoggerProps) => {
  const values = useFormStore(store);
  useEffect(() => {
    console.log(`FORM_STORE - ${store}: `, values);
  }, [store, values]);
  return null;
};
