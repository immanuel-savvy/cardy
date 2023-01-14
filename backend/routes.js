import {
  login,
  register_user,
  user_refresh,
  verify_email,
  verify_later,
} from './route_handlers/users';

const router = app => {
  app.get('/user_refresh/:user', user_refresh);
  //
  app.post('/register_user', register_user);
  app.post('/login', login);
  app.post('/verify_email', verify_email);
  app.post('/verify_later', verify_later);
};

export default router;
