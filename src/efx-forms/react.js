import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { createForm, formConfigDefault, getForm } from './form';
import { fieldConfigDefault } from './field';

export const EfxForm = ({
  children = null,
  onSubmit = () => {},
  remoteValidation = false,
  skipClientValidation = false,
  name = formConfigDefault.name,
  initialValues = formConfigDefault.initialValues,
  validateOnBlur = formConfigDefault.validateOnBlur,
  validateOnChange = formConfigDefault.validateOnChange,
}) => {
  const form = useMemo(() => {
    return createForm(name);
  }, [name]);

  const submit = (e) => {
    e.preventDefault();
    if (remoteValidation) {
      return form.submitRemote({ cb: onSubmit, skipClientValidation });
    }
    form.submit({ cb: onSubmit });
  };

  const fields = React.Children.toArray(children);
  return (
    <form onSubmit={submit}>
      {fields.map(field => {
        const isExField = field?.type?.componentName === 'ExField';
        return isExField ? React.cloneElement(field, {
          form,
          formConfig: {
            initialValues,
            validateOnBlur,
            validateOnChange,
          },
        }) : field;
      })}
    </form>
  );
};

export const EfxField = ({
  Field,
  form = getForm(formConfigDefault.name),
  name,
  formConfig: { initialValues, ...formConfig} = formConfigDefault,
  initialValue = initialValues[name],
  parse = fieldConfigDefault.parse,
  format = fieldConfigDefault.format,
  validators = fieldConfigDefault.validators,
  validateOnBlur,
  validateOnChange,
  ...props
}) => {
  const { $value, $errors, onChange, onBlur } = useMemo(() => {
    const field = form.fields[name];
    const fieldConfig = {
      name,
      form,
      initialValue,
      parse,
      validators,
      validateOnBlur,
      validateOnChange,
      ...formConfig,
    };
    field && (field.config = fieldConfig);
    return field || form.registerField(fieldConfig);
  }, [form, name, initialValue, parse, validators, validateOnBlur, validateOnChange, formConfig]);

  const value = useStore($value) || '';
  const [error] = useStore($errors);

  return (
    <Field {...{
      error,
      name,
      value: format(value),
      onChange,
      onBlur: () => onBlur(),
      ...props,
    }} />
  );
};

EfxField.componentName = 'ExField';
