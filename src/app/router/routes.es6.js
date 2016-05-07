import LandingPage from './handlers/LandingPage';
import Frontpage from './handlers/Frontpage';
import Login from './handlers/Login';
import Dashboard from './handlers/Dashboard';
import EditSubreddit from './handlers/EditSubreddit';

export default [
  ['/', LandingPage],
  ['/dashboard', Dashboard],
  ['/r/:subredditName', Frontpage],
  ['/r/:subredditName/:subredditUUID/edit', EditSubreddit],
  ['/login', Login],
];
