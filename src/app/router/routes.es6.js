import LandingPageHandler from './handlers/LandingPageHandler';
import CreateCampaignHandler from './handlers/CreateCampaignHandler';
import DashboardHandler from './handlers/DashboardHandler';
import LoginHandler from './handlers/LoginHandler';
import LogoutHandler from './handlers/LogoutHandler';

import { RouteDict, Route } from './helpers';

let routes = new RouteDict();

routes.add('landing', new Route('/', LandingPageHandler));
routes.add('dashboard', new Route('/dashboard', DashboardHandler));
routes.add('create-campaign', new Route('/create-campaign', CreateCampaignHandler));
routes.add('login', new Route('/login', LoginHandler));
routes.add('logout', new Route('/logout', LogoutHandler));

export default routes;
