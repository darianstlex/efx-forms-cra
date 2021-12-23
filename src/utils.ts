import { TFieldValidator } from 'efx-forms';

export const required = (msg = 'Field is required'): TFieldValidator => (val: string) => !val ? msg : false;
export const email = (msg = 'Not valid email'): TFieldValidator => (val: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? msg : false;
export const min = (min: number, msg = `Should be greater than ${min}`): TFieldValidator => (val: number) => val < min ? msg : false;
