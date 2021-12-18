import { guard, sample } from 'effector';
import { domain } from './utils';

const { store, event } = domain;

export const fieldConfigDefault = {
  parse: value => value,
  format: value => value,
  validators: [],
};

export const createField = ({ name, ...fieldConfig }, {
  formChange,
  updateValidation,
  updateTouch,
  updateValue,
  setRemoteErrors,
}) => {
  let config = { name, ...fieldConfig };

  const update = event(`${name}-field-update`);
  const reset = event(`${name}-field-reset`);
  const validate = event(`${name}-field-validate`);
  const setError = event(`${name}-field-push-error`);
  const onChange = event(`${name}-field-onChange`);
  const onBlur = event(`${name}-field-onBlur`);
  const $value = store(config.initialValue || null, { name: `$${name}-field-value` })
    .on(update, (_, value) => value)
    .on(onChange, (_, value) => config.parse(value))
    .on(reset, () => config.initialValue || null);

  sample({
    source: onChange,
    fn: (value) => ({ name, value }),
    target: formChange,
  });

  sample({
    source: $value,
    fn: (value) => ({ name, value }),
    target: updateValue,
  });

  const $touched = store(false, { name: `$${name}-field-touched` })
    .on(onChange, () => true)
    .reset(reset);

  const $changedAfterBlur = store(false, { name: `$${name}-field-changed-after-blur` })
    .on(onChange, () => true)
    .on(validate, () => false)
    .reset(reset);

  sample({
    source: $touched,
    fn: (touched) => ({ name, touched }),
    target: updateTouch,
  });

  const $errors = store([], {
    name: `$${name}-field-errors`,
    updateFilter: (curr, prev) => JSON.stringify(curr) !== JSON.stringify(prev),
  }).on(
    sample({
      clock: validate,
      source: $value,
      fn: (value) => config.validators.map((vd) => vd(value)).filter(Boolean),
    }),
    (_, errors) => errors,
  ).on(
    setRemoteErrors,
    (_, { remoteErrors }) => (remoteErrors[name] ? [remoteErrors[name]] : []),
  ).reset(reset);

  sample({
    source: $errors,
    fn: ([error]) => ({ name, valid: !error }),
    target: updateValidation,
  });

  guard({
    clock: onBlur,
    source: [$touched, $changedAfterBlur],
    filter: ([touched, changed]) => changed && touched && config.validateOnBlur && !config.validateOnChange,
    target: validate,
  });

  guard({
    clock: onChange,
    source: $touched,
    filter: (touched) => touched && config.validateOnChange,
    target: validate,
  });

  const syncData = () => {
    updateValue({ name, value: $value.getState() });
    const [error] = $errors.getState();
    updateValidation({ name, valid: !error });
  };

  return {
    $value,
    $touched,
    $errors,
    onChange,
    onBlur,
    update,
    reset,
    validate,
    setError,
    syncData,
    get config() {
      return config;
    },
    set config(data) {
      config = { ...config, ...data };
    },
  };
};