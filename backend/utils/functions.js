const charset =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const combinations = {
  alnum: charset,
  num: '01234556789',
  alpha: 'abcdefghijklmnopqrstuvwxyz',
};

let phone_regex =
  /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

let email_regex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const gen_random_int = (max_int, min_int = 0) =>
  min_int + Math.floor(Math.random() * max_int);

const generate_random_string = (len = 6, combination = 'num') => {
  let string = '';
  let char_combination = combinations[combination];
  for (let i = 0; i < len; i++)
    string += char_combination[gen_random_int(char_combination.length)];

  return string;
};

export {generate_random_string, gen_random_int, email_regex, phone_regex};
