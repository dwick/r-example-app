import LandingPage from './handlers/LandingPage';
import Frontpage from './handlers/Frontpage';
import Login from './handlers/Login';

export default [
  ['/', LandingPage],
  ['/r/:subredditName', Frontpage],
  ['/login', Login],
];
