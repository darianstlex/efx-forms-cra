import { useForm } from 'efx-forms/useForm';
import { useFormStore } from 'efx-forms/useFormStore';
import { TFormStoreKey } from 'efx-forms';

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
  const form = useForm(name);
  console.log(`FORM - ${name}: `, form);
  return null;
};
