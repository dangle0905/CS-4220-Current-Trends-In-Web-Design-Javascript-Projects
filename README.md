# CS-4220-Current-Trends-In-Web-Design-Javascript-Projects

npm init 
creates node package

touch config.json 
creates config file

npm install superagent
SuperAgent is a small HTTP request library that may be used to make AJAX requests in Node. js and browsers. The fact that SuperAgent has dozens of plugins available to accomplish things like prevent caching, convert server payloads, or prefix or suffix URLs, is pretty impressive.

npm install express
Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. 
It's a layer built on the top of the Node js that helps manage servers and routes.

npm install –save-dev nodemon
nodemon is an npm module and tool that helps with development of Node.js based
applications by automatically restarting the Node application when file changes in the directory
are detected. nodemon does not require any additional changes to our code or method of development. In fact nodemon can be easily installed using npm and then adding a line our scripts object inside
the package.json file.
(automatically refreshers server) to run it nodemon server.js

// to start with nodemon from the package.json
// on OsX or Linux use: npm run start
// on Windows use: npm run windows


npm install cors
CORS is a node. js package for providing a Connect/Express middleware that can be used to enable CORS with various options
npm install yargs
Yargs module is used for creating your own command-line commands in node.js and helps in generating an elegant user interface. This module makes command-line arguments flexible and easy to use.
(my explanation yargs basically is use to build your command line interface)

npm install inquirer
Inquirer helps with the process of prompting for inputs in CLI applications. It is also able to,
parse these inputs and perform validation. Inquirer differs from Yargs as it provides the user interface and the inquiry session flow. It is not command line program utility like Yargs. Instead it provides various styles of prompts (yes/no, selection based, raw input and more for an application.
(my explanation inquirer is used to create prompts in CLI)

------------------------------------------------------------------------------------------------------------
if you want a module to use another module 
example:
require('./app.js');
^^inside the argument is the path to the module

if you want a module to use a dependency
example:
require('yargs/yargs');
^^inside the argument is the path to the module

to export a function and make it usable
example:
module.exports = {
	function;
}
