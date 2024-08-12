import { useFormStore } from 'forms/useFormStore';
import { TFormStoreKey, useFormInstance } from 'forms';

interface StoreLoggerProps {
  store: TFormStoreKey;
  name?: string;
}

export const FormStoreLogger = ({ store, name }: StoreLoggerProps) => {
  const values = useFormStore(store, name);
  console.log(`FORM_STORE - ${store}: `, values);
  return null;
};

export const FormLogger = ({ name }: { name?: string }) => {
  const form = useFormInstance(name);
  console.log(`FORM - ${form.config.name}: `, form);
  return null;
};
