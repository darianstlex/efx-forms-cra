import { createDomain } from 'effector';
import { attachLogger } from 'effector-logger/attach';

export const domain = createDomain('forms');

attachLogger(domain, {
  console: 'enabled',
  inspector: 'disabled',
  reduxDevtools: 'disabled',
});

export const previous = (store) => store
  .map((curr, last) => ({ last, curr }))
  .map(({ last: { curr } = {} }) => curr);