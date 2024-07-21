import { useFormStores } from 'efx-forms/useFormStores';
import { TFormStoreKey } from 'efx-forms';
import { useFormStore } from 'efx-forms/useFormStore';
import { useFormValues } from 'efx-forms/useFormValues';
import { useFieldData } from 'efx-forms/useFieldData';

const Display = ({ title, data }: { title: string, data: any }) => (
  <div style={{ margin: '10px 0', border: 'solid 1px grey' }}>
    <div style={{ margin: '10px 0' }}>{title}</div>
    <pre style={{ margin: '10px 10px', textAlign: 'left', fontSize: '12px' }}>
      {JSON.stringify(data, undefined, 2)}
    </pre>
  </div>

);

export const UseFormStores = ({ title = 'Block', formName, stores = [] }: {
  title?: string,
  stores: TFormStoreKey[],
  formName?: string;
}) => {
  const values = useFormStores(stores, formName);
  return (<Display title={title} data={values} />);
};

export const UseFormStore = ({ title = 'Block', store, formName }: {
  title?: string;
  store: TFormStoreKey;
  formName?: string;
}) => {
  const value = useFormStore(store, formName);
  return (<Display title={title} data={value} />);
};

export const UseFormValues = ({ title = 'Block', formName }: { title?: string; formName?: string }) => {
  const values = useFormValues(formName);
  return (<Display title={title} data={values} />);
};

export const UseFieldValue = ({ title = 'Block', field, formName }: { title?: string, field: string; formName?: string }) => {
  const {value} = useFieldData(field, formName);
  return (<Display title={title} data={value} />);
};