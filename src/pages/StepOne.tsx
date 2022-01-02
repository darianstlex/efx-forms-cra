import React from 'react';
import { getForm, IFormValues, IFormValidators, TFieldValue } from 'efx-forms';
import { Form, Field, FieldDataProvider } from 'efx-forms/react';
import { required, email, min } from 'efx-forms/validators';

import { FormStoreLogger } from 'components/FormStoreLogger';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { Code } from 'components/Code';

const stepOne = getForm('stepOne');

const formValidators: IFormValidators = {
  'user.name': [required({ msg: 'Form Validation - REQUIRED!' })],
};

const parseISO = (date: string): TFieldValue => new Date(date).toISOString();
const formatISO = (date: TFieldValue) => {
  const d = new Date(date as string);
  return date ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : '';
};

export const StepOne = () => {
  const submit = (values: IFormValues) => {
    console.log('SUBMIT: ', values);
  };
  const reset = () => {
    stepOne.reset();
  };
  return (
    <Form
      keepOnUnmount
      name="stepOne"
      onSubmit={submit}
      initialValues={{
        'user.name': 'StoreLogger',
        'user.age': '34',
      }}
      validators={formValidators}
    >
      <FormStoreLogger store="$errors" />
      <FieldDataProvider name="user.name" stores={['$value', '$dirty']}>
        {([value, dirty]) => <div>Name Watcher: {value} - {dirty ? 'Dirty' : 'Not Dirty'}</div>}
      </FieldDataProvider>
      <div>
        <Field
          name="user.name"
          Field={Input}
          label="Name"
          type="text"
          initialValue="JustName"
        />
      </div>
      <Field
        name="user.email"
        Field={Input}
        label="Email"
        type="text"
        validators={[required(), email()]}
      />
      <Field
        name="user.age"
        Field={Input}
        label="Age"
        type="number"
        validators={[min({ value: 18 })]}
      />
      <Field
        validateOnChange
        name="user.dob"
        Field={Input}
        label="DOB"
        type="date"
        parse={parseISO}
        format={formatISO}
        validators={[required()]}
      />

      <Button type="submit">Submit</Button>
      {'  '}
      <Button secondary onClick={reset}>Reset</Button>

      <Code store={stepOne.$values} title="Values" />
      <Code store={stepOne.$errors} title="Errors" />
    </Form>
  );
};
