import './App.css';
import { getForm } from './efx-forms';
import { REfxForm, REfxField } from './efx-forms';
import { Input } from './components/Input';
import { Checkbox } from './components/Checkbox';

const vehicleForm = getForm('vehicle');

const required = (msg = 'Field is required') => (val: string) => !val ? msg : false;
const email = (msg = 'Not valid email') => (val: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? msg : false;
const min = (min: number, msg = `Should be greater than ${min}`) => (val: number) => val < min ? msg : false;

function App() {
  const remoteSubmit = async () => {
    const api = () => {
      return Promise.resolve({ 'user.name': 'Name is already in use' });
    };
    try {
      const data = await vehicleForm.submitRemote({ cb: api, skipClientValidation: true });
      console.log('REMOTE SUBMIT: ', data);
    } catch (e) {
      console.log('REMOTE SUBMIT ERROR: ', e);
    }
  };
  const submit = (data: any) => {
    console.log('SUBMIT: ', data);
  };
  const reset = () => {
    vehicleForm.reset();
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-form">
          <REfxForm name="vehicle" onSubmit={submit} initialValues={{
            'user.name': 'Tester',
            'user.age': '34',
          }}>
            <REfxField
              name="user.name"
              Field={Input}
              label="User Name"
              type="text"
              validators={[required()]}
              initialValue="JustName"
            />
            <REfxField
              name="user.email"
              Field={Input}
              label="User Email"
              type="text"
              validators={[required(), email()]}
            />
            <REfxField
              name="user.age"
              Field={Input}
              label="User Age"
              type="number"
              validators={[min(18)]}
            />
            <REfxField
              name="user.dob"
              Field={Input}
              label="User DOB"
              type="text"
              validators={[required()]}
            />
          </REfxForm>
          <REfxForm name="vehicle">
            <REfxField
              name="customer.name"
              Field={Input}
              label="Customer Name"
              type="text"
              validators={[required()]}
            />
            <REfxField
              name="customer.email"
              Field={Input}
              label="Customer Email"
              type="text"
              validators={[required(), email()]}
            />
            <REfxField
              name="customer.canTransact"
              Field={Checkbox}
              label="Can Transact"
            />
            <REfxField
              name="customer.age"
              Field={Input}
              label="Customer Age"
              type="number"
              validators={[min(21)]}
            />
            <REfxField
              name="customer.dob"
              Field={Input}
              label="Customer DOB"
              type="text"
              validators={[required()]}
            />
            <button type="button" onClick={remoteSubmit}>Remote Submit</button>
            {' '}
            <button type="submit">Submit</button>
            {' '}
            <button type="button" onClick={reset}>Reset</button>
          </REfxForm>
        </div>
      </header>
    </div>
  );
}

export default App;
