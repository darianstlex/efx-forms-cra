import React from 'react';
import { getForm, REfxForm, REfxField } from 'efx-forms';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';

const vehicleForm = getForm('step-two');

const required = (msg = 'Field is required') => (val: string) => !val ? msg : false;
const email = (msg = 'Not valid email') => (val: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? msg : false;
const min = (min: number, msg = `Should be greater than ${min}`) => (val: number) => val < min ? msg : false;

export const StepTwo = () => {
  const remoteSubmit = async () => {
    const api = () => {
      return Promise.reject({ 'customer.name': 'Name is already in use' });
    };
    try {
      await vehicleForm.submitRemote({ cb: api, skipClientValidation: true });
    } catch (e) {
      console.log('REMOTE SUBMIT ERROR: ', e);
    }
  };
  const reset = () => {
    vehicleForm.reset();
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
