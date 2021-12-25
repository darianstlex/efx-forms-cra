import React, { useEffect } from 'react';
import { getForm } from 'efx-forms';
import { REfxForm, REfxField, REfxWhen } from 'efx-forms/react';
import { required, email, min } from 'efx-forms/validators';

import { Input } from 'components/Input';
import { Checkbox } from 'components/Checkbox';
import { Button } from 'components/Button';
import { Code } from 'components/Code';

const stepTwo = getForm('step-two');

export const StepTwo = () => {
  useEffect(() => () => stepTwo.reset(), []);
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
    <REfxForm name="step-two">
      <REfxField
        name="customer.name"
        Field={Input}
        label="Name"
        type="text"
        validators={[required()]}
      />
      <REfxField
        name="customer.email"
        Field={Input}
        label="Email"
        type="text"
        validators={[required(), email()]}
      />
      <REfxField
        name="customer.canTransact"
        Field={Checkbox}
        label="Can Transact"
      />
      <REfxField
        name="customer.age"
        Field={Input}
        label="Age"
        type="number"
        validators={[min({ value: 21 })]}
      />
      <REfxWhen
        check={(values: any) => Number(values['customer.age']) > 20 }
        setTo={{ 'customer.name': 'Expert', 'customer.salary': '300' }}
        resetTo={{ 'customer.salary': '100' }}
        updateDebounce={500}
      >
        <REfxField
          name="customer.salary"
          Field={Input}
          label="Salary"
          type="text"
        />
      </REfxWhen>
      <REfxField
        name="customer.dob"
        Field={Input}
        label="DOB"
        type="date"
        validators={[required()]}
      />

      <Button type="button" onClick={remoteSubmit}>Remote Submit</Button>
      {'  '}
      <Button color="secondary" type="button" onClick={reset}>Reset</Button>

      <Code store={stepTwo.$values} title="Values" />
      <Code store={stepTwo.$errors} title="Errors" />
    </REfxForm>
  );
};
