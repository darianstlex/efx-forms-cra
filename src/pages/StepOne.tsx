import React from 'react';
import { getForm, REfxForm, REfxField } from 'efx-forms';
import { Input } from '../components/Input';

const vehicleForm = getForm('step-one');

const required = (msg = 'Field is required') => (val: string) => !val ? msg : false;
const email = (msg = 'Not valid email') => (val: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? msg : false;
const min = (min: number, msg = `Should be greater than ${min}`) => (val: number) => val < min ? msg : false;

export const StepOne = () => {
  const submit = (data: any) => {
    console.log('SUBMIT: ', data);
  };
  const reset = () => {
    vehicleForm.reset();
  };
  return (
    <REfxForm name="step-one" onSubmit={submit} initialValues={{
      'user.name': 'Tester',
      'user.age': '34',
    }}>
      <REfxField
        name="user.name"
        Field={Input}
        label="User Name"
        type="text"
        validators={[required()]}
        initialValue="JustName"
      />
      <REfxField
        name="user.email"
        Field={Input}
        label="User Email"
        type="text"
        validators={[required(), email()]}
      />
      <REfxField
        name="user.age"
        Field={Input}
        label="User Age"
        type="number"
        validators={[min(18)]}
      />
      <REfxField
        name="user.dob"
        Field={Input}
        label="User DOB"
        type="text"
        validators={[required()]}
      />
      <button type="submit">Submit</button>
      {' '}
      <button type="button" onClick={reset}>Reset</button>
    </REfxForm>
  );
};
