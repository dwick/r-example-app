import './Logout.less';
import 'less/buttons.less';

import classNames from 'classnames';
import React from 'react';
import { METHODS } from '@r/platform/router';
import { Form } from '@r/platform/components';

import routes from 'app/router/routes';

const T = React.PropTypes;

export default class Logout extends React.Component {
  static propTypes = {
    className: T.string,
  };

  render() {
    const className = classNames('Logout', this.props.className);

    return (
      <Form className={ className } method={ METHODS.POST } action={ routes.getUrl('logout') }>
        <button type='submit' className='btn btn-link'>logout</button>
      </Form>
    );
  }
};
