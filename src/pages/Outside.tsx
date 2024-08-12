import React from 'react';

import { TextField } from 'components/Input';
import { Button } from 'components/Button';

import { Form } from 'forms';
import { useFormMethods } from 'forms/useFormMethods';
import { required } from 'forms/validators';

export const Outside = () => {
  const { reset } = useFormMethods('formOutside');
  return (
    <>
      <Form
        name="formOutside"
        onSubmit={() => {}}
        validators={{
          'user.name': [required()],
          'user.password': [required()],
        }}
      >
        <TextField
          data-test="user.name"
          name="user.name"
          label="Name"
          validators={[required({ msg: 'Must have' })]}
        />
        <TextField
          data-test="user.password"
          name="user.password"
          label="Password"
        />
        <Button data-test="submit" type="submit">
          Submit
        </Button>
        <span style={{ display: 'inline-block', width: 20 }}/>
        <Button secondary data-test="reset" onClick={() => reset()}>
          Reset
        </Button>
      </Form>
      <div style={{ width: 400, margin: '0 auto' }}>
        <TextField
          passive
          formName="formOutside"
          data-test="user.password-outside"
          name="user.password"
          label="Password Outside"
        />
      </div>
    </>
  );
};
