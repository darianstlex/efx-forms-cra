import { guard, sample } from 'effector';
import { domain } from './utils';

export const fieldConfigDefault = {
  parse: value => value,
  format: value => value,
  validators: [],
};

export const createField = ({ name, ...fieldConfig }, {
  updateValidation,
  updateTouch,
  updateValue,
  submitRemote,
}) => {
  let config = { name, ...fieldConfig };

  const update = domain.event(`${name}-field-update`);
  const reset = domain.event(`${name}-field-reset`);
  const validate = domain.event(`${name}-field-validate`);
  const setError = domain.event(`${name}-field-push-error`);
  const onChange = domain.event(`${name}-field-onChange`);
  const onBlur = domain.event(`${name}-field-onBlur`);
  const $value = domain.store(config.initialValue || null, { name: `$${name}-field-value` })
    .on(update, (_, value) => value)
    .on(onChange, (_, value) => config.parse(value))
    .on(reset, () => config.initialValue || null);

  sample({
    source: $value,
    fn: (value) => ({ name, value }),
    target: updateValue,
  });

  const $touched = domain.store(false, { name: `$${name}-field-touched` })
    .on(onChange, () => true)
    .reset(reset);

  const $changedAfterBlur = domain.store(false, { name: `$${name}-field-changed` })
    .on(onChange, () => true)
    .on(validate, () => false)
    .reset(reset);

  sample({
    source: $touched,
    fn: (touched) => ({ name, touched }),
    target: updateTouch,
  });

  const $errors = domain.store([], {
    name: `$${name}-field-errors`,
    updateFilter: (curr, prev) => JSON.stringify(curr) !== JSON.stringify(prev),
  }).on(
    sample({
      clock: validate,
      source: $value,
      fn: (value) => config.validators.map((vd) => vd(value)).filter(Boolean),
    }),
    (_, errors) => errors,
  ).on(submitRemote.fail, (_, { errors }) => errors && errors[name] ? [errors[name]] : [])
    .reset(reset);

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
    updateTouch({ name, touched: $touched.getState() });
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