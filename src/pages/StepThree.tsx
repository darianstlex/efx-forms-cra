import React from 'react';
import {Form, Field, useFormInstance} from '../forms';

import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { useFormMethods } from '../forms/useFormMethods';
import { Code } from '../components/Code';


export const StepThree = () => {
  const form = useFormInstance('stepThree');
  const { reset } = useFormMethods('stepThree');

  const submit = (values: any) => {
    console.log('SUBMIT: ', values);
  };

  return (
    <Form
      keepOnUnmount
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
            name={`user.address[${idx}]`}
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
