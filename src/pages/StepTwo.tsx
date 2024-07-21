import React from 'react';
import { useFormInstance } from 'efx-forms';
import { Form, Field } from 'efx-forms';
import { IfFormValues } from 'efx-forms/IfFormValues';
import { FormDataProvider } from 'efx-forms/FormDataProvider';
import { required, email, min } from 'efx-forms/validators';

import { Input } from 'components/Input';
import { Checkbox } from 'components/Checkbox';
import { Button } from 'components/Button';
import { Code } from 'components/Code';
import { FormStoreLogger } from 'components/FormStoreLogger';
import { useUnit } from 'effector-react';

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
        name="customer.canTransact"
        Field={Checkbox}
        label="Can Transact"
      />
      <IfFormValues
        check={(values: any) => values['customer.canTransact']}
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
      </IfFormValues>
      <Field
        name="customer.age"
        Field={Input}
        label="Age"
        type="number"
        validators={[min({ value: 21 })]}
      />
      <Field
        name="customer.dob"
        Field={Input}
        label="DOB"
        type="date"
        validators={[required()]}
      />

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
      <Code store={form.$errors} title="Errors" />
    </Form>
  );
};
