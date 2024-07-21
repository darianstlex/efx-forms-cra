import React from 'react';
import { Form, Field, getForm } from 'efx-forms';
import { required, email } from 'efx-forms/validators';

import { Input } from 'components/Input';
import { Button } from 'components/Button';

const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

const ARR = Array.from(Array(2000).keys());

const form = getForm({ name: 'stepTest' });

export const Test = () => {

  const submit = async (values: any) => {
    await wait(1000);
    console.log('SUBMIT: ', values, form);
    return Promise.reject({ 'customer.name': 'Name is already in use' });
  };

  return (
    <Form name="stepTest" onSubmit={submit}>
      {ARR.map((value, idx) => (<Field
        key={`email-${idx}`}
        name={`customer.name-${idx}`}
        Field={Input}
        label={`Name-${idx}`}
        type="email"
        validators={[required(), email()]}
      />))}
      <Button type="submit">Submit</Button>
    </Form>
  );
};
