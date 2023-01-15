import {RENT_REQUESTS, USER_RENT_REQUESTS} from '../ds/conn';

const pending_request = (req, res) => {
  let {user} = req.params;

  let request = USER_RENT_REQUESTS.readone({user});

  res.json({ok: true, message: 'pending_request', data: request});
};

const new_rent_request = (req, res) => {
  let request = req.body;

  let rent_result = RENT_REQUESTS.write(request);
  request._id = rent_result._id;
  request.created = rent_result.created;

  let user_request = USER_RENT_REQUESTS.write({
    request: request._id,
    user: request.user,
  });

  res.json({
    ok: true,
    message: 'new rent request',
    data: {
      _id: request._id,
      created: request.created,
      user_request_id: user_request._id,
    },
  });
};

const remove_request = (req, res) => {
  let {request} = req.params;

  let result = RENT_REQUESTS.remove(request);
  USER_RENT_REQUESTS.remove({request, user: result.user});

  res.end();
};

export {pending_request, new_rent_request, remove_request};
