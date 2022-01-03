import React from 'react';
import { Form, FieldDataProvider, FieldsValueProvider } from 'efx-forms/react';


import { FormStoreLogger } from 'components/FormStoreLogger';
import {
  UseFieldStore,
  UseFieldStores,
  UseFieldsValue,
  UseFieldValue,
  UseFormStore,
  UseFormStores,
  UseFormValues,
} from 'components/Hooks';


export const Hooks = () => {
  return (
    <Form keepOnUnmount name="stepOne">
      <FormStoreLogger store="$errors" />
      <FieldDataProvider name="user.name" stores={['$value', '$dirty']}>
        {([value, dirty]) => (
          <div>Name Watcher: {value} - {dirty ? 'Dirty' : 'Not Dirty'}</div>
        )}
      </FieldDataProvider>
      <FieldsValueProvider fields={['user.email', 'user.age']}>
        {([email, age]: any) => (
          <div>Email-Age: {email} - {age}</div>
        )}
      </FieldsValueProvider>
      <UseFormStores
        title="Use Form Stores - actives/errors"
        stores={['$actives', '$errors']}
      />
      <UseFormValues title="Use Form Values" />
      <UseFormStore title="Use Form Store - valid" store="$valid"/>
      <UseFieldValue title="Use Field Value - user.name" field="user.name" />
      <UseFieldStore
        title="Use Field Store - user.age - $value"
        name="user.age"
        store="$value"
      />
      <UseFieldStores
        title="Use Field Stores - user.email - [$value, $errors]"
        name="user.email"
        stores={['$value', '$errors']}
      />
      <UseFieldsValue
        title="Use Fields Values - [user.name, user.email]"
        fields={['user.name', 'user.email']}
      />
    </Form>
  );
};
