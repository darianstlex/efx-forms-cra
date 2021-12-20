import { createDomain, Store } from 'effector';
// @ts-ignore
import { attachLogger } from 'effector-logger/attach';

export const domain = createDomain('forms');

attachLogger(domain, {
  console: 'enabled',
  inspector: 'disabled',
  reduxDevtools: 'disabled',
});

export const previous = (store: Store<any>) => store
  .map((curr, last) => ({ last, curr }))
  .map(({ last: { curr = null } = {} }: any) => curr);
