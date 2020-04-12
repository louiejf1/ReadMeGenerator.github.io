//npm init
//npm install packages
//load and install packages in js file


// Create a command-line application that dynamically generates a README.md from a user's input. The application will be invoked with the following command:

const fs = require("fs");
const util = require('util');
const inquirer = require("inquirer");
const axios = require("axios"); //https://www.npmjs.com/package/axios

// The user will be prompted for their GitHub username, which will be used to make a call to the GitHub API to retrieve their email and profile image. 

// They will then be prompted with questions about their project.


let promptUser = () => {
    return inquirer.prompt([ //start with prompt - see documentation pages
        // inqurer works via array of object that asks questions
        {
            type: "input",
            name: "username",
            message: "What is your GITHUB username"
        }


    ]).then(

        // get  repo details function

        function (responce) {
            let gitRepoNames = [];
            let gitRepoList = `https://api.github.com/users/${responce.username}/repos`;


            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>User Details>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            let tempUserName = "https://api.github.com/users/louiejf1";
            let gitHubApi = "https://api.github.com";
            let current_user_authorizations_html_url = "https://api.github.com/hub";



            axios.get(tempUserName)
                .then(function (res) {

                    //console.log(res);
                    let name = res.data.name;
                    //console.log(name);
                    let avatar = res.data.avatar_url;
                    //console.log(avatar);
                    let repos_url = res.data.repos_url;
                    //console.log(repos_url);

                    fs.appendFile("readme.txt", "Avatar: " + avatar + "\n" + "\n", function (err) {

                        if (err) {
                            return console.log(err);
                        }

                        console.log("Success!");

                    });
                });

            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Repo Details>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            axios.get(gitRepoList)
                .then(function (res1) {
                    //console.log(res1);
                    //console.log(res1.data[3].name);

                    for (let i = 0; i < res1.data.length; i++) {
                        // console.log(res1.data[i].name);
                        gitRepoNames.push("Project Title: " + res1.data[i].id + ": " + res1.data[i].name + "\n");
                        gitRepoNames.push("Project Desc: " + res1.data[i].id + ": " + res1.data[i].description + "\n");

                    }

                    fs.appendFile("readme.txt", gitRepoNames, function (err) {

                        if (err) {
                            return console.log(err);
                        }

                        console.log("Success!");

                    });

                });
        }

    );


};


promptUser();