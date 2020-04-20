const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const clearIntercom = require('./utils/clearIntercom');
const clearApp2 = require('./utils/clearApp2');
const questions = require('./utils/questions');


// Question argument for the inquirer sequence

const [q1, q2, q3, q4, q5] = questions;

// Initializing the app

const app = () => {
  // initializing the variables
  let action = '';
  let stand = '';
  let country = '';
  let rememberMeToken = '';

  console.log(`${chalk.bold.bgBlue('\n\n Welcome!                                     ')}\n\nWelcome to the clear-monitoring application. Use your arrow keys & enter key to follow through the prompts below. If you get stuck at any step. Please refer to the PDF guide that came in the clear-monitoring folder. You can hit Ctrl+C at any time to quite this process.\n\n${chalk.bold.bgBlue(' Step 1:                                      ')}\n\n`);
  // ##First Question - Which actions to execute##
  inquirer.prompt(q1).then((answers1) => {
    // Setting the varibales
    action = answers1.action;
    stand = answers1.stand;
    country = answers1.country;
    // ##Second Question - Admin credentials & user email##
    inquirer.prompt(q2).then((answers2) => {
      const email = answers2.userEmail;
      rememberMeToken = answers2.rememberMe.trim();
      console.log(`\n\n${chalk.bold.bgBlue(' Step 2:                                      ')}\n\n`);
      console.log(`\n\nNext, copy the following code highlighted in${chalk.bold.underline.green(' green ')}below into the DB Queries panel on the ${chalk.bold('Stand/Country')} you need and, execute it:\n\n${chalk.green(`db.admin_monitoring.find({"email" :\n "${email.trim()}"}).forEach(function(am) {\n
           print(am._id.valueOf());\n
       })`)}\n\nThen copy the values into a file called data.csv and save it in the monitoring-clear folder. \n\n`);
      // ##Third Question - Ready to continue?##
      inquirer.prompt(q3).then((answers3) => {
        if (!answers3.askAgain) {
          app();
        } else {
          console.log(
            chalk.bold('\n\nAction: ') + chalk.green(`${action}\n`)
            + chalk.bold('Stand: ') + chalk.green(`${stand}\n`)
            + chalk.bold('Country: ') + chalk.green(`${country}\n`)
            + chalk.bold('RememberMe Token: ') + chalk.green(`${rememberMeToken}\n`)
            + chalk.bold('\n\nExecuting URL: ') + chalk.green(`https://${stand}.simpletexting.com/rest/admin/monitoring/messageid/${action}?country=${country}\n\n`),
          );
          console.log(`\n\n${chalk.bold.bgBlue(' Step 3:                                      \n\n')}`);
          // ##Forth Question - Ready to continue?##
          inquirer.prompt(q4).then((answers4) => {
            if (!answers4.askAgain) {
              app();
            } else {
              console.log(chalk.bold.magenta('\n\nClearing monitoring has started...\n\n'));
              // Set variables
              const input = 'data.csv';
              const data = fs.readFileSync(input, 'utf8');
              const messages = data.split('\n');
              // Launch the clear monitoring utility.
              clearApp2(action, country, messages, rememberMeToken, stand);
              // ##Fifth Question - Execute the intercom closing sequence?##
              console.log(`\n\n${chalk.bold.bgBlue(' Step 4 (Optional):                              \n\n')}`);
              inquirer.prompt(q5).then((answers5) => {
                if (answers5.askAgain) {
                  console.log(chalk.bold.magenta('\n\nClosing Intercom Messages...\n\n'));
                  clearIntercom();
                } else {
                  console.log('You are all done!');
                }
              });
            }
          });
        }
      });
    });
  });
};

app();
