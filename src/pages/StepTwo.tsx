import React from 'react';
import { getForm } from 'efx-forms';
import { Form, Field, DisplayWhen } from 'efx-forms/react';
import { required, email, min } from 'efx-forms/validators';

import { Input } from 'components/Input';
import { Checkbox } from 'components/Checkbox';
import { Button } from 'components/Button';
import { Code } from 'components/Code';

const stepTwo = getForm('stepTwo');

export const StepTwo = () => {
  const remoteSubmit = async () => {
    const api = () => {
      return Promise.reject({ 'customer.name': 'Name is already in use' });
    };
    try {
      await stepTwo.submitRemote({ cb: api, skipClientValidation: true });
    } catch (e) {
      console.log('REMOTE SUBMIT ERROR: ', e);
    }
  };
  const reset = () => {
    stepTwo.reset();
  };
  return (
    <Form name="stepTwo">
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

      <Button onClick={remoteSubmit}>Remote Submit</Button>
      {'  '}
      <Button secondary onClick={reset}>Reset</Button>

      <Code store={stepTwo.$values} title="Values" />
      <Code store={stepTwo.$errors} title="Errors" />
    </Form>
  );
};
