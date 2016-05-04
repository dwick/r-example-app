import React from 'react';
import { METHODS } from '@r/platform/router';
import { Form } from '@r/platform/components';

export default class Login extends React.Component {
  render() {
    return (
      <Form className='Login' method={ METHODS.POST } action='/login'>
        <div><input name='username' placeholder='username'/></div>
        <div><input name='password' placeholder='password' type='password'/></div>
        <div><button type='submit'>Submit</button></div>
      </Form>
    );
  }
};
