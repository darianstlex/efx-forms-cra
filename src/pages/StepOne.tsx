import React, {useEffect} from 'react';
import { getForm, REfxForm, REfxField } from 'efx-forms';
import { Input } from '../components/Input';
import { required, email, min } from '../utils';
import {Button} from "../components/Button";

const stepOne = getForm('step-one');

export const StepOne = () => {
  useEffect(() => () => stepOne.reset());
  const submit = (data: any) => {
    console.log('SUBMIT: ', data);
  };
  const reset = () => {
    stepOne.reset();
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
      <Button type="submit">Submit</Button>
      {' '}
      <Button color="secondary" type="button" onClick={reset}>Reset</Button>
    </REfxForm>
  );
};
