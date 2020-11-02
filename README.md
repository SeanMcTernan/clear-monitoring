# Clear Monitoring <a href="https://github.com/SeanMcTernan" target="_blank"><img src="https://raw.githubusercontent.com/SeanMcTernan/SeanMcTernan/140c9255ba95e71fc0988bc36cc1f327fe360b9f/ReadMe_Badge.svg" width="120"/></a>


<img src="https://raw.githubusercontent.com/SeanMcTernan/SeanMcTernan/342bcf0aafc064e7fbb3c56c9b7a444ce3585ca7/Clear-Monitoring_Logo.svg" align="right"
     alt="Clear-Monitoring App Image By Sean Mc Ternan " width="120" height="178">


Clear Monitoring is an App that was build to help support staff close thousands of emails on the <a href="https://www.intercom.com/" target="_blank">Intercom platform</a> all at once via a CLI. Through prompts the user can choose to close numerous emails associated with open tickets. The App can also release the associate message from the SimpleTexing platform which triggered the email in the first place. 


## Technologies Used
| Name                                                        | Purpose                                                                                                    |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [NodeJS](https://nodejs.org/en/)         | Main programming language for the project |
| [Axios](https://www.npmjs.com/package/axios)                      | To make requests to the Intercom API |
| [Chalk](https://www.npmjs.com/package/chalk) | To provide nicer visuals on the command prompts                                                          |
| [ENV-CMD](https://www.npmjs.com/package/env-cmd)                     | To set environment variables                                                                                        |
| [NPM](https://www.npmjs.com/)                                | As a package manager                                                         |
| [Inquirer](https://www.npmjs.com/package/inquirer)               | To manage the questions asked via the CLI                                                                                 |
| [Nodemon](https://www.npmjs.com/package/nodemon)                            | Restart the app during development                                                                                       |
| [Request](https://www.npmjs.com/package/request)                                   | To call the SimpleTexting API    

### The App

<p align="center">
  <img src="https://github.com/SeanMcTernan/SeanMcTernan/blob/main/Clear_Monitoring_Sample.png?raw=true" alt="Clear Monitoring CLI" width="738">
</p>

Below is a small snippet of the app in action. As you can see the emails are being closed at an extremely quick rate. The alternative, was to manually enter each email and select the close option.  

<p align="center">
<img src="https://github.com/SeanMcTernan/SeanMcTernan/blob/main/Intercom.gif?raw=true"
  alt="Gif showing intercom emails being closed en masse"
  width="500">
</p>

### Motivation & what was learned

The app was originally created to assist fellow support staff. The process before was rather laborious to close out open conversations in Intercom during a rush. I really felt there was a better more efficient way to close out these conversations and this is where the app was born. Along the way I learned some neat technologies like Inquirer and Chalk, though the biggest takeaway was finally getting a solid grasp of asynchronous functions. The app needed to call the intercom API continuously while it was running, so getting comfortable with asynchronous functions was vital to the successful rollout of the app. 

### Install Instructions

1. Clone/Download the Repository 
2. From the folder run `npm install`
3. Add an intercom API in the following location `credentials/credentials.js`Api Keys available at [Intercom](https://www.intercom.com/) 
4. Run `node app`

### Development Time: 3 Weeks
