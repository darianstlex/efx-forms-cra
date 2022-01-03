import {
  useFormStores,
  useFormValues,
  useFormStore,
  useFieldValue,
  useFieldStore,
  useFieldStores,
  useFieldsValue,
} from 'efx-forms/react';
import { TFieldStoreKey, TFormStoreKey } from 'efx-forms/model';

const Display = ({ title, data }: { title: string, data: any }) => (
  <div style={{ margin: '10px 0', border: 'solid 1px grey' }}>
    <div style={{ margin: '10px 0' }}>{title}</div>
    <pre style={{ margin: '10px 10px', textAlign: 'left', fontSize: '12px' }}>
      {JSON.stringify(data, undefined, 2)}
    </pre>
  </div>

);

export const UseFormStores = ({ title = 'Block', stores = [] }: {
  title?: string,
  stores: TFormStoreKey[]
}) => {
  const values = useFormStores(stores);
  return (<Display title={title} data={values} />);
};

export const UseFormStore = ({ title = 'Block', store }: {
  title?: string;
  store: TFormStoreKey;
}) => {
  const value = useFormStore(store);
  return (<Display title={title} data={value} />);
};

export const UseFormValues = ({ title = 'Block' }: { title?: string }) => {
  const values = useFormValues();
  return (<Display title={title} data={values} />);
};

export const UseFieldValue = ({ title = 'Block', field }: { title?: string, field: string }) => {
  const value = useFieldValue(field);
  return (<Display title={title} data={value} />);
};

export const UseFieldStore = ({ title = 'Block', name, store }: {
  title?: string;
  name: string;
  store: TFieldStoreKey;
}) => {
  const value = useFieldStore(name, store);
  return (<Display title={title} data={value} />);
};

export const UseFieldStores = ({ title = 'Block', name, stores }: {
  title?: string;
  name: string;
  stores: TFieldStoreKey[];
}) => {
  const values = useFieldStores(name, stores);
  return (<Display title={title} data={values} />);
};

export const UseFieldsValue = ({ title = 'Block', fields }: {
  title?: string;
  fields: string[];
}) => {
  const values = useFieldsValue(fields);
  return (<Display title={title} data={values} />);
};
