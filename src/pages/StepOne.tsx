import React from 'react';
import { IFormValues, IFormValidators, TFieldValue } from 'efx-forms';
import { Form, Field, FieldDataProvider, useForm } from 'efx-forms/react';
import { required, email, min } from 'efx-forms/validators';

import { FormStoreLogger } from 'components/FormStoreLogger';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { Code } from 'components/Code';
import { Select } from 'components/Select';

const formValidators: IFormValidators = {
  'user.name': [required({ msg: 'Form Validation - REQUIRED!' })],
};

const parseISO = (date: string): TFieldValue => new Date(date).toISOString();
const formatISO = (date: TFieldValue) => {
  const d = new Date(date as string);
  return date ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : '';
};

const carOptions = [
  { value: '', label: 'Not Selected' },
  { value: 'volvo', label: 'Volvo' },
  { value: 'saab', label: 'Saab' },
  { value: 'mercedes', label: 'Mercedes' },
  { value: 'audi', label: 'Audi' },
];

export const StepOne = () => {
  const form = useForm('stepOne');

  const submit = (values: IFormValues) => {
    console.log('SUBMIT: ', values);
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
        {([value, dirty]) => (
          <div>Name Watcher: {value} - {dirty ? 'Dirty' : 'Not Dirty'}</div>
        )}
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
        name="user.car"
        Field={Select}
        label="Car"
        options={carOptions}
        validators={[required()]}
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
      <Button secondary onClick={() => form.reset()}>Reset</Button>

      <Code store={form.$values} title="Values" />
      <Code store={form.$errors} title="Errors" />
    </Form>
  );
};
