import React, { useEffect } from 'react';
import { getForm, REfxForm, REfxField, IFormValues } from 'efx-forms';
import { Input } from 'components/Input';
import { required, email, min } from 'utils';
import { Button } from 'components/Button';
import { Code } from 'components/Code';

const stepOne = getForm('step-one');

export const StepOne = () => {
  useEffect(() => () => stepOne.reset());
  const submit = (values: IFormValues) => {
    console.log('SUBMIT: ', values);
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
        label="Name"
        type="text"
        validators={[required()]}
        initialValue="JustName"
      />
      <REfxField
        name="user.email"
        Field={Input}
        label="Email"
        type="text"
        validators={[required(), email()]}
      />
      <REfxField
        name="user.age"
        Field={Input}
        label="Age"
        type="number"
        validators={[min(18)]}
      />
      <REfxField
        name="user.dob"
        Field={Input}
        label="DOB"
        type="date"
        parse={(date) => new Date(date as string).toISOString()}
        format={(date) => {
          const d = new Date(date as string);
          return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }}
        validators={[required()]}
      />

      <Button type="submit">Submit</Button>
      {'  '}
      <Button color="secondary" type="button" onClick={reset}>Reset</Button>

      <Code store={stepOne.$values} title="Values" />
      <Code store={stepOne.$errors} title="Errors" />
    </REfxForm>
  );
};
