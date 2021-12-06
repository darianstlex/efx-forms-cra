import './App.css';
import { getForm } from './efx-forms';
import { EfxForm, EfxField } from './efx-forms/react';
import { Input } from './components/Input';
import { Checkbox } from './components/Checkbox';

const vehicleForm = getForm('vehicle');

const required = (msg = 'Field is required') => (val) => !val ? msg : false;
const email = (msg = 'Not valid email') => (val) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? msg : false;
const min = (min, msg = `Should be greater than ${min}`) => (val) => val < min ? msg : false;

function App() {
  const submit = async () => {
    const api = () => Promise.resolve({ 'user.name': 'Name is already used' });
    vehicleForm.submitRemote({ cb: api });
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-form">
          <EfxForm name="vehicle">
            <EfxField
              name="user.name"
              Field={Input}
              label="User Name"
              type="text"
              validators={[required()]}
            />
            <EfxField
              name="user.email"
              Field={Input}
              label="User Email"
              type="text"
              validators={[required(), email()]}
            />
            <EfxField
              name="user.age"
              Field={Input}
              label="User Age"
              type="number"
              validators={[min(18)]}
            />
            <EfxField
              name="user.dob"
              Field={Input}
              label="User DOB"
              type="text"
              validators={[required()]}
            />
          </EfxForm>
          <EfxForm name="vehicle">
            <EfxField
              name="customer.name"
              Field={Input}
              label="Customer Name"
              type="text"
              validators={[required()]}
            />
            <EfxField
              name="customer.email"
              Field={Input}
              label="Customer Email"
              type="text"
              validators={[required(), email()]}
            />
            <EfxField
              name="customer.canTransact"
              Field={Checkbox}
              label="Can Transact"
            />
            <EfxField
              name="customer.age"
              Field={Input}
              label="Customer Age"
              type="number"
              validators={[min(21)]}
            />
            <EfxField
              name="customer.dob"
              Field={Input}
              label="Customer DOB"
              type="text"
              validators={[required()]}
            />
            <button type="button" onClick={submit}>Submit</button>
          </EfxForm>
        </div>
      </header>
    </div>
  );
}

export default App;
