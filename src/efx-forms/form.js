import { combine, guard, sample } from 'effector';
import { domain } from './utils';
import { isEmpty, set, reduce } from 'lodash';
import { createField } from './field';

const { store, effect, event } = domain;

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

  const updateValidation = event(`${name}-form-update-validation`);
  const updateTouch = event(`${name}-form-update-touch`);
  const updateValue = event(`${name}-form-update-value`);
  const reset = event(`${name}-form-reset`);
  const onChange = event(`${name}-form-change`);

  const $validations = store({}, { name: `$${name}-form-validations`})
    .on(updateValidation, (state, { name, valid }) => ({ ...state, [name]: valid }));

  const $valid = $validations.map((state) => !isEmpty(state) ? !Object.values(state).some((it) => !it) : true);

  const $touches = store({}, { name: `$${name}-form-touches`})
    .on(updateTouch, (state, { name, touched }) => ({ ...state, [name]: touched }));

  const $touched = $touches.map((state) => !isEmpty(state) ? !Object.values(state).some((it) => !it): true);

  const $values = store({}, { name: `$${name}-form-values`})
    .on(updateValue, (state, { name, value }) => ({ ...state, [name]: value }));

  const $shapedValues = $values.map((values) => reduce(values, (acc, val, key) => set(acc, key, val), {}));

  const submit = ({ cb }) => {
    Object.values(fields).forEach(({ validate }) => validate());
    if ($valid.getState()) {
      cb({
        values: $values.getState(),
        shapedValues: $shapedValues.getState(),
      });
    }
  };

  const submitRemote = effect({
    handler: async ({ cb, skipClientValidation = false }) => {
      if (!skipClientValidation) {
        Object.values(fields).forEach(({ validate }) => validate());
        if (!$valid.getState()) {
          return Promise.reject({ errors: $validations.getState() });
        }
      }
      const values = {
        values: $values.getState(),
        shapedValues: $shapedValues.getState(),
      };
      const remoteErrors = await cb(values);
      if (isEmpty(remoteErrors)) {
        return Promise.resolve(values);
      }
      return Promise.reject({ remoteErrors });
    },
    name: `${name}-form-submit`,
  });

  reset.watch(() => {
    Object.values(fields).forEach(({ reset }) => reset());
  });

  const $state = combine(
    $validations, $valid, $touches, $touched, $values, $shapedValues,
    (validations, valid, touches, touched, values, shapedValues) => ({
      validations, valid, touches, touched, values, shapedValues,
    }),
  );

  const $changes = store({}, { name: `$${name}-form-changes`})
    .on(sample({
      clock: onChange,
      fn: (values, { name, value }) => ({ ...values, [name]: value }),
      source: $values,
    }), (_, values) => values);

  return {
    $changes,
    $shapedValues,
    $touched,
    $valid,
    $values,
    $state,
    $submitting: submitRemote.pending,
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
    getField: (name) => fields[name],
    registerField: ({ name, ...fieldConfig }) => {
      if (fields[name]) {
        fields[name].config = { name, ...fieldConfig };
      }
      fields[name] = createField({ name, ...fieldConfig }, {
        formChange: onChange,
        updateValidation,
        updateTouch,
        updateValue,
        setRemoteErrors: guard({
          source: submitRemote.failData,
          filter: ({ remoteErrors }) => remoteErrors,
        }),
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

