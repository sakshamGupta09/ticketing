const ERROR_MESSAGES: Record<string, string> = {
  emailRequired        : 'Email is required',
  invalidEmail         : 'Please enter a valid email',
  passwordRequired     : 'Password is required',
  loginFailed          : 'Invalid email or password',
  forgotPasswordFailed : 'If you have a valid account, password recovery instructions have been sent to the registered email address.',
  strongPassword       : 'Please enter a strong password.',
  passwordNotMatching  : 'Passwords do not match.'
};

export default ERROR_MESSAGES;
