# Clear Monitoring <a href="https://github.com/SeanMcTernan" target="_blank"><img src="https://raw.githubusercontent.com/SeanMcTernan/SeanMcTernan/140c9255ba95e71fc0988bc36cc1f327fe360b9f/ReadMe_Badge.svg" width="120"/></a>


<img src="https://raw.githubusercontent.com/SeanMcTernan/SeanMcTernan/342bcf0aafc064e7fbb3c56c9b7a444ce3585ca7/Clear-Monitoring_Logo.svg" align="right"
     alt="Clear-Monitoring App Image By Sean Mc Ternan " width="120" height="178">


Clear Monitoring is an App that was build to help support staff close thousands of emails on the <a href="https://www.intercom.com/" target="_blank">Intercom platform</a> all at once via a CLI. Through prompts the user can choose to close numerous emails associated with open tickets. The App can also release the associate message from the SimpleTexing platform which triggered the email in the first place. 


## Technologies Used
* <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">NodeJS</a>
* <a href="https://www.npmjs.com/package/axios" target="_blank">Axios</a>
* <a href="https://www.npmjs.com/package/chalk" target="_blank">Chalk</a>
* <a href="https://www.npmjs.com/package/ENV-CMD" target="_blank">ENV-CMD</a>
* <a href="https://www.npmjs.com/package/Inquirer" target="_blank">Inquirer</a>
* <a href="https://www.npmjs.com/package/Nodemon" target="_blank">Nodemon</a>
* <a href="https://www.npmjs.com/package/Request" target="_blank">Request</a>

### The App

<p align="center">
  <img src="https://github.com/SeanMcTernan/SeanMcTernan/blob/main/Clear_Monitoring_Sample.png?raw=true" alt="Clear Monitoring CLI" width="738">
</p>

Below is a small snippet of the app in action. As you can see the emails are being closed at an extrememly quick rate. The altenative, was to manually enter each email and select the close option. 

<p align="center">
<img src="https://github.com/SeanMcTernan/SeanMcTernan/blob/main/Intercom.gif?raw=true"
  alt="Gif showing intercom emails being closed en masse"
  width="500">
</p>

### Motivation & what was learned

The app was originally created to assist fellow support staff. The process before was rather laborious to close out open conversations in Intercom during a rush. I really felt there was a better more efficient way to close out these conversations and this is where the app was born. Along the way I learned some neat technologies like Inquirer and Chalk, though the biggest takeaway for me was the finally getting a solid grasp of asynchronous functions. The app need to call the intercom API continuously while it was running so getting comfortable with asynchronous functions was quite vital to the successful rollout of the app. 

### Install Instructions
To install/run the app navigate to the app folder and run <code>Node App</code>. Note API keys are required to run the app successfully which have not been provided in this repo. Running the app is strictly for demo purposes only. 

### Time Spent: 3 Weeks
