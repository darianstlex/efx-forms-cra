import React, { useEffect, useState } from 'react';
import { sample } from 'effector';
import { useUnit } from 'effector-react';
import { getForm } from '../forms';
import { Form, Field, useFormInstance  } from '../forms';
import { FieldDataProvider  } from '../forms/FieldDataProvider';
import { FormDataProvider  } from '../forms/FormDataProvider';
import { required, email, min } from '../forms/validators';

import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { Code } from 'components/Code';
import { Select } from 'components/Select';
import { UseFieldValue, UseFormStore, UseFormValues } from 'components/Hooks';
import { FormLogger } from 'components/FormStoreLogger';

export const nameAndAge = ({ msg = 'Name and age are required' } = {}) =>
  (value: string, { 'user.name': userName }: Record<string, any> = {}) => !value || !userName ? msg : false;

const formValidators = {
  'user.name': [required({ msg: 'Form Validation - REQUIRED!' })],
};

const parseISO = (date: string): any => new Date(date).toISOString();
const formatISO = (date: any) => {
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

const formInst = getForm({ name: 'stepOne' });

sample({
  clock: formInst.$values.map((it) => it['user.age'] || 0),
  filter: (age) => !!age,
  fn: (age) => ({ 'user.name': age > 30 ? 'Old' : 'Boy' }),
  target: formInst.setValues,
});

export const StepOne = () => {
  const form = useFormInstance('stepOne');
  const [reset] = useUnit([form.reset]);
  const [age, setAge] = useState(35);

  useEffect(() => {
    setTimeout(() => setAge(20), 2000);
  }, []);

  const submit = (values: any) => {
    console.log('SUBMIT: ', values);
  };

  return (
    <Form
      keepOnUnmount
      name="stepOne"
      onSubmit={submit}
      initialValues={{
        'user.name': 'StoreLogger',
        'user.age': age,
      }}
      validators={formValidators}
    >
      <FormLogger />
      <Field
        name="user.name"
        Field={Input}
        label="Name"
        type="text"
        initialValue="JustName"
      />
      <Field
        validateOnChange
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
        parse={(val) => val ? Number(val): val}
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

      <FieldDataProvider name="user.name">
        {({ value, dirty }) => (
          <div>Name Watcher: {value} - {dirty ? 'Dirty' : 'Not Dirty'}</div>
        )}
      </FieldDataProvider>
      <FormDataProvider>
        {({ dirty }) => (
          <div>Touched-Dirty: {JSON.stringify(dirty)}</div>
        )}
      </FormDataProvider>
      <UseFieldValue title="Use Field Value - user.name" field="user.name" />
      <UseFormStore title="Use Form Store - touches" store="$touches" />
      <UseFormValues title="Use Form Values" />

      <Button type="submit">Submit</Button>
      {'  '}
      <Button secondary onClick={() => reset()}>Reset</Button>

      <Code store={form.$values} title="Values" />
      <Code store={form.$error} title="Errors" />
      <Code store={form.$errors} title="Errors All" />
    </Form>
  );
};
