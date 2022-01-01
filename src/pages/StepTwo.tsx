import React from 'react';
import { getForm, IFormValues } from 'efx-forms';
import { Form, Field, DisplayWhen, FormDataProvider } from 'efx-forms/react';
import { required, email, min } from 'efx-forms/validators';

import { Input } from 'components/Input';
import { Checkbox } from 'components/Checkbox';
import { Button } from 'components/Button';
import { Code } from 'components/Code';
import { FormStoreLogger } from '../components/FormStoreLogger';

const stepTwo = getForm('stepTwo');

const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export const StepTwo = () => {
  const submit = async (values: IFormValues) => {
    await wait(2000);
    console.log('SUBMIT: ', values);
    return Promise.reject({ 'customer.name': 'Name is already in use' });
  };
  const reset = () => {
    stepTwo.reset();
  };
  return (
    <Form name="stepTwo" onSubmit={submit}>
      <FormStoreLogger store="$submitting" />
      <Field
        name="customer.name"
        Field={Input}
        label="Name"
        type="text"
        validators={[required()]}
      />
      <Field
        name="customer.email"
        Field={Input}
        label="Email"
        type="text"
        validators={[required(), email()]}
      />
      <Field
        initialValue={false}
        name="customer.canTransact"
        Field={Checkbox}
        label="Can Transact"
      />
      <Field
        name="customer.age"
        Field={Input}
        label="Age"
        type="number"
        validators={[min({ value: 21 })]}
      />
      <DisplayWhen
        check={(values: any) => Number(values['customer.age']) > 20 }
        setTo={{ 'customer.name': 'Expert', 'customer.salary': '300' }}
        resetTo={{ 'customer.salary': '100' }}
        updateDebounce={0}
      >
        <Field
          name="customer.salary"
          Field={Input}
          label="Salary"
          type="text"
        />
      </DisplayWhen>
      <Field
        name="customer.dob"
        Field={Input}
        label="DOB"
        type="date"
        validators={[required()]}
      />

      <FormDataProvider stores={['$submitting']}>
        {([submitting]) => <Button disabled={submitting} type="submit">Submit</Button>}
      </FormDataProvider>
      {'  '}
      <Button secondary onClick={reset}>Reset</Button>

      <Code store={stepTwo.$values} title="Values" />
      <Code store={stepTwo.$errors} title="Errors" />
    </Form>
  );
};
