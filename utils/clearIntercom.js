/* eslint-disable camelcase */
const axios = require('axios');
const chalk = require('chalk');
const params = require('./params');

const {
  config, closeBodyParameters, closeURL, recursiveSearchBody, searchBodyParameters, searchUrl,
} = params;


let count = 1;
let listOfConversations = [];

// Add conversations to conversations array

const addConversations = (conversations) => {
  conversations.forEach((conversation) => {
    listOfConversations.push(conversation.id);
  });
};


// Recursive loop to call each page of data from the Intercom API
// eslint-disable-next-line consistent-return
const fetchPages = async (starting_after) => {
  if (starting_after) {
    console.log(`Fetching conversation from page: ${count}`);
    count += 1;
    recursiveSearchBody.pagination.starting_after = starting_after;
    const response = await axios.post(searchUrl, recursiveSearchBody, config).catch((error) => {
      console.log(
        `${chalk.bold.bgRed('\n\nError: ')
        }Failed to get get page ${count}. Server Returned - ${error}\n\n`,
      );
    });
    if (response.data.pages.next) {
      const nextResponse = await fetchPages(response.data.pages.next.starting_after);
      return [response].concat(nextResponse);
    }
  }
};

// Iterate over conversatiosn list and call the Intercom API to close each

const closeConversation = (conversationIDs) => {
  const interval = 300;
  let promise = Promise.resolve();
  conversationIDs.forEach((conversation) => {
    promise = promise.then(() => {
      axios
        .post(
          `${closeURL}${conversation}/parts`,
          closeBodyParameters,
          config,
        )
        .catch((error) => {
          console.log(
            `${chalk.bold.bgRed('\n\nError: ')
            }Failed to get close conversations. Server Returned - ${error}\n\n`,
          );
        });
      return new Promise((resolve) => {
        setTimeout(resolve, interval);
      });
    });
  });
  promise.then(() => {
    listOfConversations = [];

    // Set timeout on this call for a few seconds to allow
    // Intercom API to update conversation count.

    setTimeout(() => {
      axios
        .post(searchUrl, searchBodyParameters, config)
        .then((response) => {
          if (response.data.total_count > 0) {
            // Loop through once again if all conversations are not closed
            // eslint-disable-next-line no-use-before-define
            clearIntercom();
          } else {
            console.log(
              `\n\n${
              chalk.bold.bgBlue(
                'Complete!                                     ',
              )
              }\n\n`,
            );
            console.log(
              'You are all done. Thank you for using the clear-intercom app!\n\n',
            );
          }
        }).catch((error) => {
          console.log(
            `${chalk.bold.bgRed('\n\nError: ')
            }Failed to get close remaining conversations. Server Returned - ${error}\n\n`,
          );
        });
    }, 5000);
  });
};

const clearIntercom = () => {
  axios
    .post(searchUrl, searchBodyParameters, config)
    .then((response) => {
      console.log(`Total Number of conversations: ${response.data.total_count}`);
      const { conversations } = response.data;
      addConversations(conversations);
      const { totalPages } = response.data.pages;
      // Set condition to skip 'Fetch Pages' call there is just a single page of data
      if (totalPages > 1) {
        const { starting_after } = response.data.pages.next;
        // eslint-disable-next-line no-shadow
        const responseCollection = async (starting_after) => {
          const results = await fetchPages(starting_after);
          results.forEach((result) => {
            // Pagination is unreliable on Intercom API,
            // it may not return a value for the final page
            if (result !== undefined) {
              // eslint-disable-next-line no-shadow
              const { conversations } = result.data;
              addConversations(conversations);
            }
          });
          closeConversation(listOfConversations);
        };
        responseCollection(starting_after);
      } else {
        closeConversation(listOfConversations);
      }
    }).catch((error) => {
      console.log(
        `${chalk.bold.bgRed('\n\nError: ')
        }Failed to get number of pages. Server Returned - ${error}\n\n`,
      );
    });
};


module.exports = clearIntercom;
