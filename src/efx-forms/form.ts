import { combine, Effect, guard, sample } from 'effector';
import { domain } from './utils';
import { isEmpty, set, reduce } from 'lodash';
import { createField } from './field';
import {
  IFormValidationUpdate,
  IFormConfig,
  IFormValidations,
  IFormTouches,
  IFormToucheUpdate,
  IFormValues,
  IFormValueUpdate,
  IFormOnFieldChange,
  IFormSubmitArgs,
  IFormSubmitResponseSuccess,
  IFormSubmitResponseError,
  IForms,
  IForm,
  IFormFields,
  IFormConfigDefault,
} from './model';

const { store, effect, event } = domain;

export const formConfigDefault: IFormConfigDefault = {
  name: 'default',
  initialValues: {},
  validateOnBlur: true,
  validateOnChange: false,
};

export const forms: IForms = {
  [formConfigDefault.name]: {} as IForm,
};

const createFormHandler = (formConfig: IFormConfig): IForm => {
  let config: IFormConfig = { ...formConfig };
  const { name } = formConfig;

  const fields: IFormFields = {};

  const updateValidation = event<IFormValidationUpdate>(`${name}-form-update-validation`);
  const updateTouch = event<IFormToucheUpdate>(`${name}-form-update-touch`);
  const updateValue = event<IFormValueUpdate>(`${name}-form-update-value`);
  const reset = event<void>(`${name}-form-reset`);
  const onChange = event<IFormOnFieldChange>(`${name}-form-change`);

  const $validations = store<IFormValidations>({}, { name: `$${name}-form-validations`})
    .on(updateValidation, (state, { name, valid }) => ({ ...state, [name]: valid }));

  const $valid = $validations.map((state) => !isEmpty(state) ? !Object.values(state).some((it) => !it) : true);

  const $touches = store<IFormTouches>({}, { name: `$${name}-form-touches`})
    .on(updateTouch, (state, { name, touched }) => ({ ...state, [name]: touched }));

  const $touched = $touches.map((state) => !isEmpty(state) ? !Object.values(state).some((it) => !it): true);

  const $values = store<IFormValues>({}, { name: `$${name}-form-values`})
    .on(updateValue, (state, { name, value }) => ({ ...state, [name]: value }));

  const $shapedValues = $values.map((values) => reduce(values, (acc, val, key) => set(acc, key, val), {}));

  const submit = ({ cb }: IFormSubmitArgs) => {
    Object.values(fields).forEach(({ validate }) => validate());
    if ($valid.getState()) {
      cb({
        values: $values.getState(),
        shapedValues: $shapedValues.getState(),
      });
    }
  };

  const submitRemote: Effect<IFormSubmitArgs, IFormSubmitResponseSuccess, IFormSubmitResponseError> = effect({
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

  const $state = combine(
    $validations, $valid, $touches, $touched, $values, $shapedValues,
    (validations, valid, touches, touched, values, shapedValues) => ({
      validations, valid, touches, touched, values, shapedValues,
    }),
  );

  const $changes = store<IFormValues>({}, { name: `$${name}-form-changes`})
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
    name,
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
      fields[name] = createField(
        { name, ...fieldConfig },
        {
        formChange: onChange,
        resetField: reset,
        updateValidation,
        updateTouch,
        updateValue,
        setRemoteErrors: guard({
          source: submitRemote.failData,
          filter: ({ remoteErrors }) => !!remoteErrors,
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

export const createForm = (config: IFormConfig) => {
  const { name } = config;
  if (forms[name]) {
    forms[name].config = config;
    return forms[name];
  }
  forms[name] = createFormHandler(config);
  return forms[name];
};

export const getForm = (name = formConfigDefault.name) => forms[name] || createForm({ name });

