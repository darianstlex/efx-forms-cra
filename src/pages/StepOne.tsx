import React, { useEffect } from 'react';
import { getForm, REfxForm, REfxField, IFormValues, IFormValidations, TFieldValue } from 'efx-forms';
import { required, email, min } from 'efx-forms/dist/validators';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { Code } from 'components/Code';

const stepOne = getForm('step-one');

const formValidations: IFormValidations = {
  'user.name': [required({ msg: 'Form Validation - REQUIRED!' })],
};

const parseISO = (date: TFieldValue) => new Date(date as string).toISOString();
const formatISO = (date: TFieldValue) => {
  const d = new Date(date as string);
  return date ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : '';
};

export const StepOne = () => {
  useEffect(() => () => stepOne.reset(), []);
  const submit = (values: IFormValues) => {
    console.log('SUBMIT: ', values);
  };
  const reset = () => {
    stepOne.reset();
  };
  return (
    <REfxForm
      name="step-one"
      onSubmit={submit}
      initialValues={{
        'user.name': 'Tester',
        'user.age': '34',
      }}
      validations={formValidations}
    >
      <REfxField
        name="user.name"
        Field={Input}
        label="Name"
        type="text"
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
        validators={[min({ value: 18 })]}
      />
      <REfxField
        name="user.dob"
        Field={Input}
        label="DOB"
        type="date"
        parse={parseISO}
        format={formatISO}
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
