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

  /**
   * Validations store - keeps all fields validations
   */
  const $validations = store<IFormValidations>({}, { name: `$${name}-form-validations`})
    .on(updateValidation, (state, { name, valid }) => ({ ...state, [name]: valid }));

  /**
   * Calculates form validation
   */
  const $valid = $validations.map((state) => !isEmpty(state) ? !Object.values(state).some((it) => !it) : true);

  /**
   * Touches store - keeps all fields touches
   */
  const $touches = store<IFormTouches>({}, { name: `$${name}-form-touches`})
    .on(updateTouch, (state, { name, touched }) => ({ ...state, [name]: touched }));

  /**
   * Calculates form touched
   */
  const $touched = $touches.map((state) => !isEmpty(state) ? !Object.values(state).some((it) => !it): true);

  /**
   * Values store - keeps all fields values
   */
  const $values = store<IFormValues>({}, { name: `$${name}-form-values`})
    .on(updateValue, (state, { name, value }) => ({ ...state, [name]: value }));

  /**
   * Transform values from flat to structured object
   */
  const $shapedValues = $values.map((values) => reduce(values, (acc, val, key) => set(acc, key, val), {}));

  /**
   * Sync form submit with option to skip validation
   */
  const submit = ({ cb, skipClientValidation }: IFormSubmitArgs) => {
    Object.values(fields).forEach(({ validate }) => validate());
    if ($valid.getState() || skipClientValidation) {
      cb({
        values: $values.getState(),
        shapedValues: $shapedValues.getState(),
      });
    }
  };

  /**
   * Remote validation form submit with option to skip client validation
   * cb - is api call for the remote validation, response contains validation
   * results in format { field1: message, field2: message }, if empty - valid
   */
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

  /**
   * Common store with all form data
   */
  const $state = combine(
    $validations, $valid, $touches, $touched, $values, $shapedValues,
    (validations, valid, touches, touched, values, shapedValues) => ({
      validations, valid, touches, touched, values, shapedValues,
    }),
  );

  /**
   * Changes store, triggers on form onChange
   */
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

/**
 * Create/return form with the given name / config
 */
export const createForm = (config: IFormConfig) => {
  const { name } = config;
  if (forms[name]) {
    forms[name].config = config;
    return forms[name];
  }
  forms[name] = createFormHandler(config);
  return forms[name];
};

/**
 * Return form with given name
 * @param name
 */
export const getForm = (name = formConfigDefault.name) => forms[name] || createForm({ name });

