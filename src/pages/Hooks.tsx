import React from 'react';
import { FieldDataProvider } from 'efx-forms/FieldDataProvider';

import { FormLogger, FormStoreLogger } from 'components/FormStoreLogger';
import {
  UseFieldValue,
  UseFormStore,
  UseFormStores,
  UseFormValues,
} from 'components/Hooks';


export const Hooks = () => {
  return (
    <>
      <FormLogger name="stepOne" />
      <FormStoreLogger name="stepOne" store="$errors" />
      <FieldDataProvider name="user.name" formName="stepOne">
        {({ value, dirty }) => (
          <div>Name Watcher: {value} - {dirty ? 'Dirty' : 'Not Dirty'}</div>
        )}
      </FieldDataProvider>
      <UseFormStores
        formName="stepOne"
        title="Use Form Stores - actives/errors"
        stores={['$activeValues', '$values']}
      />
      <UseFormValues title="Use Form Values" formName="stepOne" />
      <UseFormStore title="Use Form Store - valid" store="$valid" formName="stepOne"/>
      <UseFieldValue title="Use Field Value - user.name" field="user.name" formName="stepOne" />
    </>
  );
};
