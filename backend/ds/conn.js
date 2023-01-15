import GDS from 'generalised-datastore';

let gds;

let USERS, USERS_HASH, RENT_REQUESTS, USER_RENT_REQUESTS;

const ds_conn = () => {
  gds = new GDS('cardy_mock').sync();

  USERS = gds.folder('users');
  USERS_HASH = gds.folder('user_hash', 'user');
  USER_RENT_REQUESTS = gds.folder('user_rent_requests', 'user', 'request');
  RENT_REQUESTS = gds.folder('rent_requests');
};

export {gds, USERS, USERS_HASH, RENT_REQUESTS, USER_RENT_REQUESTS};
export default ds_conn;
