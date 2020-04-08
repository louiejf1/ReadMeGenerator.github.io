//npm init
//npm install packages
//load and install packages in js file
const fs = require("fs");
const util = require('util'); 
const inquirer = require("inquirer");


let promptUser = () => {
    return inquirer.prompt([ //start with prompt - see documentation pages
        // inqurer works via array of object that asks questions
        {
            type: "input",
            name: "username",
            message: "What is your GITHUB username"
        },

    ])
};

console.log(promptUser);