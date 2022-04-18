import React from 'react';
import { IFormValues, IFormValidators, TFieldValue, TFieldValidator } from 'efx-forms';
import { Form, Field, FieldDataProvider, useForm, FieldsValueProvider } from 'efx-forms/react';
import { required, email, min } from 'efx-forms/validators';

import { FormStoreLogger } from 'components/FormStoreLogger';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { Code } from 'components/Code';
import { Select } from 'components/Select';
import {
  UseFieldStore,
  UseFieldStores,
  UseFieldsValue,
  UseFieldValue,
  UseFormStore,
  UseFormStores,
  UseFormValues,
} from 'components/Hooks';

export const nameAndAge = ({ msg = 'Name and age are required' } = {}): TFieldValidator =>
  (val: string, { 'user.name': userName }: IFormValues) => !val || !userName ? msg : false;

const formValidators: IFormValidators = {
  'user.name': [required({ msg: 'Form Validation - REQUIRED!' })],
};

const parseISO = (date: string): TFieldValue => new Date(date).toISOString();
const formatISO = (date: TFieldValue) => {
  const d = new Date(date as string);
  return date ? `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + (d.getDate() + 1)).slice(-2)}` : '';
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
        validators={[nameAndAge(), min({ value: 18 })]}
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
