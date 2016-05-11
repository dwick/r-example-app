import LandingPage from './handlers/LandingPage';
import Frontpage from './handlers/Frontpage';
import Login from './handlers/Login';
import Logout from './handlers/Logout';
import Dashboard from './handlers/Dashboard';

export default [
  ['/', LandingPage],
  ['/dashboard', Dashboard],
  ['/r/:subredditName', Frontpage],
  ['/login', Login],
  ['/logout', Logout],
];
