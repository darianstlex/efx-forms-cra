import React from 'react';
import { getForm, REfxForm, REfxField } from 'efx-forms';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { required, email, min } from '../utils';

const stepTwo = getForm('step-two');

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
    <REfxForm name="step-two">
      <REfxField
        name="customer.name"
        Field={Input}
        label="Customer Name"
        type="text"
        validators={[required()]}
      />
      <REfxField
        name="customer.email"
        Field={Input}
        label="Customer Email"
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
        label="Customer Age"
        type="number"
        validators={[min(21)]}
      />
      <REfxField
        name="customer.dob"
        Field={Input}
        label="Customer DOB"
        type="text"
        validators={[required()]}
      />
      <button type="button" onClick={remoteSubmit}>Remote Submit</button>
      {' '}
      <button type="button" onClick={reset}>Reset</button>
    </REfxForm>
  );
};
