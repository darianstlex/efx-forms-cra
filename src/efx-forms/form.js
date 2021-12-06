import { combine } from 'effector';
import { domain } from './utils';
import { isEmpty, set, reduce } from 'lodash';
import { createField } from './field';

export const formConfigDefault = {
  name: 'default',
  initialValues: {},
  validateOnBlur: true,
  validateOnChange: false,
};

export const forms = {
  [formConfigDefault.name]: {},
};

const createFormHandler = (name = formConfigDefault.name, formConfig) => {
  let config = { ...formConfig };

  const fields = {};

  const updateValidation = domain.event(`${name}-form-update-validation`);
  const updateTouch = domain.event(`${name}-form-update-touch`);
  const updateValue = domain.event(`${name}-form-update-value`);
  const reset = domain.event(`${name}-form-reset`);

  const $validations = domain.store({}, { name: `$${name}-form-validations`})
    .on(updateValidation, (state, { name, valid }) => ({ ...state, [name]: valid }));

  const $valid = $validations.map((state) => !isEmpty(state) ? !Object.values(state).some((it) => !it) : true);

  const $touches = domain.store({}, { name: `$${name}-form-touches`})
    .on(updateTouch, (state, { name, touched }) => ({ ...state, [name]: touched }));

  const $touched = $touches.map((state) => !isEmpty(state) ? !Object.values(state).some((it) => !it): true);

  const $values = domain.store({}, { name: `$${name}-form-values`})
    .on(updateValue, (state, { name, value }) => ({ ...state, [name]: value }));

  const $deep = $values.map((values) => reduce(values, (acc, val, key) => set(acc, key, val), {}));

  const submit = ({ cb }) => {
    Object.values(fields).forEach(({ validate }) => validate());
    if ($valid.getState()) {
      cb({ flat: $values.getState(), deep: $deep.getState() });
    }
  };

  const submitRemote = domain.effect({
    handler: async ({ cb, options: { skipValidation = false } = {} }) => {
      if (!skipValidation) {
        Object.values(fields).forEach(({ validate }) => validate());
        if (!$valid.getState()) {
          return Promise.reject({ errors: $validations.getState() });
        }
      }
      const remoteErrors = await cb($values.getState());
      if (isEmpty(remoteErrors)) {
        return Promise.resolve({
          flat: $values.getState(),
          deep: $deep.getState(),
        });
      }
      return Promise.reject({ remoteErrors });
    },
    name: `${name}-form-submit`,
  });

  reset.watch(() => {
    Object.values(fields).forEach(({ reset }) => reset());
  });

  const $state = combine(
    $validations, $valid, $touches, $touched, $values, $deep,
    (validations, valid, touches, touched, values, deep) => ({
      validations, valid, touches, touched, values, deep,
    }),
  );

  return {
    $state,
    reset,
    submit,
    submitRemote,
    get config() {
      return config;
    },
    set config(formConfig) {
      config = { ...config, ...formConfig };
    },
    get fields() {
      return fields;
    },
    registerField: ({ name, ...fieldConfig }) => {
      if (fields[name]) {
        fields[name].config = { name, ...fieldConfig };
      }
      fields[name] = createField({ name, ...fieldConfig }, {
        updateValidation,
        updateTouch,
        updateValue,
        submitRemote,
      });
      fields[name].syncData();
      return fields[name];
    },
    removeField: (name) => {
      delete(fields[name]);
    },
  };
};

export const createForm = (name, formConfig) => {
  if (forms[name]) {
    forms[name].config = formConfig;
    return forms[name];
  }
  forms[name] = createFormHandler(name, formConfig);
  return forms[name];
};

export const getForm = (name = formConfigDefault.name) => forms[name] || createForm(name);

