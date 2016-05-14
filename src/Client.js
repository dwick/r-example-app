import 'babel-polyfill';
import Client from '@r/platform/client';
import { isEmpty } from 'lodash/lang';

import routes from './app/router/routes';
import App from './app/App';
import allReducers from './app/reducers/importAll';
import Session from './app/models/Session';

Client({
  routes: routes.toArray(),
  reducers: allReducers,
  modifyData: data => {
    if (data.session) {
      data.session = new Session(data.session);
      window.session = data.session;
    }
    console.log(data);
    return data;
  },
  appComponent: <App/>,
  debug: true,
})();
