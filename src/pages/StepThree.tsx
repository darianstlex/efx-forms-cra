import React from 'react';

import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { Code } from 'components/Code';

import { Form, Field, useFormInstance } from 'forms';
import { useFormMethods } from 'forms/useFormMethods';
import {flattenObjectKeys} from "../forms/utils";

const initialValues = flattenObjectKeys({
  user: [
    {
      first: 'First_1',
      last: 'Last_1',
    },
    {
      first: 'First_2',
      last: 'Last_2',
    },
    {
      first: 'First_3',
      last: 'Last_3',
    },
  ],
  userAddress: [
    '12',
    'Some Street',
    'London',
  ],
});

console.log(flattenObjectKeys({
  'user.address': 'Address_1',
  'user.password': 'Address_2',
}));


export const StepThree = () => {
  const form = useFormInstance('stepThree');
  const { reset } = useFormMethods('stepThree');

  const submit = (values: any) => {
    console.log('SUBMIT: ', values);
  };

  return (
    <Form
      keepOnUnmount
      initialValues={initialValues}
      name="stepThree"
      onSubmit={submit}
    >
      {[0, 1, 2].map((idx) => (
        <div key={idx} style={{ borderTop: '1px solid white', borderBottom: '1px solid white', padding: '20px 0' }}>
          <Field
            name={`user[${idx}].first`}
            Field={Input}
            label="First"
            type="text"
          />
          <Field
            name={`user[${idx}].last`}
            Field={Input}
            label="Last"
            type="text"
          />
        </div>
      ))}
      {[0, 1, 2].map((idx) => (
        <div key={`${idx}-addr`} style={{ padding: '20px 0' }}>
          <Field
            name={`userAddress[${idx}]`}
            Field={Input}
            label={`Address ${idx + 1}`}
            type="text"
          />
        </div>
      ))}

      <Code store={form.$values} title="Values" />

      <Button type="submit">Submit</Button>
      {'  '}
      <Button secondary onClick={() => reset()}>Reset</Button>
    </Form>
  );
};
