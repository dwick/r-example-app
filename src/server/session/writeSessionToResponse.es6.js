import makeSessionFromData from './makeSessionFromData';
import setSessionCookies from './setSessionCookies';

export default writeSessionToResponse = (ctx, data) => {
  const session = makeSessionFromData(data);
  setSessionCookies(ctx, session);
  ctx.body = { session };
};
