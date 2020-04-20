const q1 = [
  {
    type: 'list',
    name: 'action',
    message:
          'What do you like to do today, Send the message (Give-Access) or archive?',
    choices: ['Give-Access', 'Archive'],
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: 'list',
    name: 'stand',
    message: 'Which stand would you like to perform this action on?',
    choices: ['App2', 'TollFree'],
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: 'list',
    name: 'country',
    message: 'Which country are the sending messages in?',
    choices: ['US', 'CA'],
    filter(val) {
      return val.toLowerCase();
    },
  },
];

const q2 = [
  {
    type: 'input',
    name: 'rememberMe',
    message: 'Please enter your RememberMe token:',
  },
  {
    type: 'input',
    name: 'userEmail',
    message: 'Please enter the users email address:',
  },
];

const q3 = [
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Are you ready to continue?',
    default: true,
  },
];

const q4 = [
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'You are about to execute the call with the information above, does everything look correct? Press enter to continue. Press \'n\' then enter to start again.',
    default: true,
  },
];

const q5 = [
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Would you like to close the messages in intercom?',
    default: true,
  },
];
module.exports = [q1, q2, q3, q4, q5];