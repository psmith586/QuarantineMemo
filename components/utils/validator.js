export const emailValidator = email => {
  const reg = /\S+@\S+\. \S+/;

  if(!email || email.length <= 0) return 'Email cannot be empty';
  if(!reg.test(email)) return 'Please enter a valid email';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Username cannot be empty';

  return '';
};