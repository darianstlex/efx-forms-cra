import React from 'react';
import { useUnit } from 'effector-react';

import { Input, TextField, NumberField } from 'components/Input';
import { CheckboxField } from 'components/Checkbox';
import { Button } from 'components/Button';
import { Code } from 'components/Code';
import { FormStoreLogger } from 'components/FormStoreLogger';
import { FieldStoreProvider } from 'components/Hooks';

import { Form, Field, useFormInstance } from 'forms';
import { IfFormValues } from 'forms/IfFormValues';
import { FormDataProvider } from 'forms/FormDataProvider';
import { required, email, min } from 'forms/validators';

const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export const StepTwo = () => {
  const form = useFormInstance('stepTwo');
  const [reset] = useUnit([form.reset]);

  const submit = async (values: any) => {
    await wait(2000);
    console.log('SUBMIT: ', values);
    return Promise.reject({ 'customer.name': 'Name is already in use' });
  };

  return (
    <>
      <TextField
        name="customer.name"
        formName="stepTwo"
        label="Name"
        validators={[required()]}
        initialValue="Hoho"
      />
      <Form name="stepTwo" onSubmit={submit} initialValues={{ 'customer.name': 'Haha' }}>
        <FormStoreLogger store="$submitting" />
        <TextField
          name="customer.email"
          label="Email"
          validators={[required(), email()]}
        />
        <CheckboxField
          name="customer.canTransact"
          label="Can Transact"
        />
        <IfFormValues
          check={(values: any) => values['customer.canTransact']}
          setTo={{ 'customer.name': 'Expert', 'customer.salary': 300 }}
          resetTo={{ 'customer.salary': 100 }}
          updateDebounce={0}
        >
          <NumberField
            name="customer.salary"
            label="Salary"
          />
        </IfFormValues>
        <NumberField
          name="customer.age"
          label="Age"
          validators={[min({ value: 21 })]}
        />
        <Field
          name="customer.dob"
          Field={Input}
          label="DOB"
          type="date"
          validators={[required()]}
        />

        <FieldStoreProvider name="customer.age" store="$touches">
          {(touched) => (
            <Button>
              {`${touched}`}
              {'  '}
              {Date.now()}
            </Button>
          )}
        </FieldStoreProvider>
        {'  '}
        <FormDataProvider>
          {({ submitting, valid }) => (
            <Button
              disabled={submitting || !valid}
              type="submit"
            >
              {submitting ? 'Busy...' : 'Submit'}
            </Button>
          )}
        </FormDataProvider>
        {'  '}
        <Button secondary onClick={() => reset()}>Reset</Button>

        <Code store={form.$activeValues} title="Active Values" />
        <Code store={form.$values} title="Values" />
        <Code store={form.$touches} title="Touches" />
      </Form>
    </>
  );
};
