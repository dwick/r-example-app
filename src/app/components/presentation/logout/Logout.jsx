import React from 'react';
import { METHODS } from '@r/platform/router';
import { Form } from '@r/platform/components';

export default class Logout extends React.Component {
  render() {
    return (
      <Form className='Logout' method={ METHODS.POST } action='/logout'>
        <button type='submit'>Logout</button>
      </Form>
    );
  }
};
