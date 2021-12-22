export const required = (msg = 'Field is required') => (val: string) => !val ? msg : false;
export const email = (msg = 'Not valid email') => (val: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? msg : false;
export const min = (min: number, msg = `Should be greater than ${min}`) => (val: number) => val < min ? msg : false;
