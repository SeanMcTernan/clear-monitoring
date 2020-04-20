const request = require('request');

const interval = 70;
// Initiate the promise and start the loop.

const clearApp2 = (action, country, messages, rememberMeToken, stand) => {
  let promise = Promise.resolve();
  messages.forEach((message) => {
    promise = promise.then(() => {
      const messageid = message.replace('\r', '');
      const options = {
        method: 'PUT',
        url: `https://${stand}.simpletexting.com/rest/admin/monitoring/${messageid}/${action}?country=${country}`,
        headers: {
          rememberMeToken,
        },
      };
      request(options, (error) => {
        if (error) throw new Error(error);
      });
      return new Promise((resolve) => {
        setTimeout(resolve, interval);
      });
    });
  });
};

module.exports = clearApp2;
