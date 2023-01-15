import {
  new_rent_request,
  pending_request,
  remove_request,
} from './route_handlers/rent';
import {
  login,
  register_user,
  request_otp,
  user_refresh,
  verify_email,
  verify_later,
} from './route_handlers/users';

const router = app => {
  app.get('/user_refresh/:user', user_refresh);
  app.get('/pending_request/:user', pending_request);
  //
  app.post('/register_user', register_user);
  app.post('/login', login);
  app.post('/remove_request/:request', remove_request);
  app.post('/new_rent_request', new_rent_request);
  app.post('/request_otp', request_otp);
  app.post('/verify_email', verify_email);
  app.post('/verify_later', verify_later);
};

export default router;
