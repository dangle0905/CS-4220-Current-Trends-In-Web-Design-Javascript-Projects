/* eslint-disable camelcase */
// Build in class with inquirer and using deck.js
const inquirer = require('inquirer');

// require in the custom deck of cards module use the module name (aka the name inside the package.json)
const ballDontLieAPI = require('balldontlie-api');
const { exit } = require('yargs');

const selectPlayerPrompt = async (listResults) => {

    //initializing an array that will hold objects containing the name and value 
    //as of now terms is empty
    const terms = []
    
    //this pushes the object that holds the key and value into terms array
    listResults.data.forEach((player) => {
            terms.push({name: `${player.first_name} ${player.last_name}`, value: `${player.id}`})
        });

    return inquirer.prompt([
        {
            type: 'list',
            name: 'userSelected',
            message: 'Select a player',
            choices: terms
        }
    ]);

};

const selectIdOrPagePrompt = async()=>{
    const terms = [
        { name: 'Select a player from results', value: 1 },
        { name: 'Jump to a page', value: 2 },
        { name: 'Exit', value: 3 }
    ];
    return inquirer.prompt([
        {
            type: 'list',
            name: 'userSelected',
            message: 'Select an option',
            choices: terms
        }
    ]);
}

const selectPagePrompt = async()=>{
    return inquirer.prompt({
        type:'input',
        name:'userSelected',
        message: 'Input page to go to: '
    })
}

const searchResults = async (args) =>{
    const searchField = args;
    const listResults = await ballDontLieAPI.searchPlayers(searchField);

    console.log()
    console.log('Search Results:');
    console.log();

    listResults.data.forEach((player) => {
        console.log(`Player Name: ${player.first_name} ${player.last_name}, Player ID: ${player.id}`);
    });
    
    console.log();

    if(listResults.meta.total_count === 0){
        console.log(`There is ${listResults.meta.total_count} result from your search.`);
    }else if (listResults.meta.total_count === 1) {
        console.log(`There is ${listResults.meta.total_count} result from your search.`);
        // prompt the user to select one of the results
        const searchInput = await selectPlayerPrompt(listResults);
        playerInfo(searchInput.userSelected);
    }else{
        console.log(`There are ${listResults.meta.total_count} results, showing pages ${listResults.meta.current_page} of ${listResults.meta.total_pages}`)

        const idOrPage = await selectIdOrPagePrompt();
        
        //a prompt that gives users three options
        if(idOrPage.userSelected === 1){
            // prompt the user to select one of the results
            const searchInput = await selectPlayerPrompt(listResults);
            playerInfo(searchInput.userSelected);

        }else if(idOrPage.userSelected===2){
            const pageNumber = await selectPagePrompt();
            searchField['page'] = pageNumber.userSelected;
            searchResults(searchField);
        }else if(idOrPage.userSelected===3){
            exit;
        }
    }

}

const playerInfo = async (args) =>{
    const playerInfo = await ballDontLieAPI.getPlayer(args);

    console.log();
    console.log('Player Information:');
    console.log();

    console.log('ID: ', playerInfo.id);
    console.log('Name: ', playerInfo.first_name, playerInfo.last_name);
    if(playerInfo.height_feet===null || playerInfo.height_inches === null){
        console.log('Height: No Height Information');
    }else{
        console.log(`Height: ${playerInfo.height_feet}' ${playerInfo.height_inches}"`);
    }
    console.log('Position: ', playerInfo.position);
    console.log('Team: ', playerInfo.team.name);
    console.log();
}

module.exports = {
    searchResults,
    playerInfo
};
