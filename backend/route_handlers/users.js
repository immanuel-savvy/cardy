import {USERS, USERS_HASH} from '../ds/conn';
import {generate_random_string} from '../utils/functions';
import {verification} from './email';
import nodemailer from 'nodemailer';

const pending_otps = new Object();

const send_mail = ({
  recipient,
  recipient_name,
  sender_pass,
  sender_name,
  sender,
  subject,
  text,
  html,
  to,
}) => {
  let transporter;

  try {
    transporter = nodemailer.createTransport({
      host: '66.29.137.48' || 'udaralinksapp.com',
      port: 465,
      secure: true,
      tls: {
        servername: 'udaralinksapp.com',
      },
      auth: {
        user: sender,
        pass: sender_pass,
      },
    });
  } catch (err) {}

  try {
    transporter.sendMail({
      from: `${sender_name} <${sender}>`,
      to: to || `${recipient_name} <${recipient}>`,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const request_otp = async (email, res) => {
  if (typeof email !== 'string') email = email.body.email;

  let code = generate_random_string(6);
  pending_otps[email] = code;

  send_mail({
    recipient: email,
    subject: '[Cardy] Please verify your email',
    sender: 'signup@udaralinksapp.com',
    sender_name: 'Cardy Mock',
    sender_pass: 'signupudaralinks',
    html: verification(code),
  });

  typeof email !== 'string' &&
    res.json({ok: true, message: 'opt sent', data: email});
};

const verify_email = async (req, res) => {
  let {code, user, email} = req.body;

  let otp_code = pending_otps[email];
  delete pending_otps[email];

  console.log(code, otp_code);

  if (
    String(otp_code).trim() &&
    String(otp_code).trim() === String(code).trim()
  ) {
    user = USERS.update({_id: user}, {verified: true});

    res.json({
      ok: true,
      message: 'verification successful',
      data: {user: user._id, verified: true},
    });
  } else
    res.json({
      ok: false,
      message: 'verification failed',
      data: {email, code, user},
    });
};

const verify_later = (req, res) => {
  let {user, email} = req.body;

  USERS.update(user, {verified: false});

  res.json({
    ok: true,
    message: 'verification successful',
    data: {user, verified: false},
  });
};

const user_refresh = (req, res) => {
  let {user} = req.params;

  res.json({ok: true, message: 'user refreshed', data: USERS.readone(user)});
};

const register_user = async (req, res) => {
  let user = req.body;

  let password = user.password;
  delete user.password;

  let email_used = USERS.readone({email: user.email});
  if (email_used && email_used.verified !== undefined) {
    return res.json({ok: false, data: {message: 'email has been used.'}});
  }

  let result;
  if (email_used) result = email_used;
  else {
    result = USERS.write(user);
    USERS_HASH.write({password, user: result._id});
  }

  user._id = result._id;
  user.created = result.created;

  await request_otp(user.email);

  res.json({ok: true, data: user});
};

const login = (req, res) => {
  let {email, password} = req.body;

  console.log(email, password);

  let user = USERS.readone({email});
  if (!user) return res.json({ok: false, data: {message: 'User not found.'}});
  let hash = USERS_HASH.readone({user: user._id, password});

  console.log(user, hash);

  if (!hash)
    return res.json({ok: false, data: {message: 'Incorrect password.'}});

  res.json({ok: true, data: {user}});
};

export {
  user_refresh,
  register_user,
  verify_email,
  verify_later,
  request_otp,
  login,
};
