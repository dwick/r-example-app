export default (router, api) => {
  router.post('/logoutproxy', async (ctx, next) => {
    ctx.cookies.set('token');
    ctx.redirect('/');
  });
}
