const yargs = require('yargs/yargs');

const app = require('./app.js');

//slice skips array index 1, 2
yargs(process.argv.slice(2))
    //i will have an option so i included [options] otherwise i wouldnt have options.
    .usage('$0: Usage <cmd> [options]')
    .command(
        // command
        'search <keyword>',
        // command description
        'list the search results for nba players',
        // builder
        (yargs) => {
            return yargs
                .positional('keyword', {
                    describe: 'last name of player',
                    default: '',
                    type: 'string'
                })
                .option('n', {
                    alias: 'number',
                    describe: 'number of results per page',
                    default: 10,
                    type: 'number'
                });
        },
        // handler
        (args) => {
            app.searchResults(args);
            

        }
    )
    .command(
        // command
        'get by ID <ID>',
        // command description
        'get the players information by ID',
        // builder
        (yargs) => {
            return yargs
                .positional('ID', {
                    describe: 'player ID',
                    default: '',
                    type: 'string'
                })
        },
        // handler
        (args) => {
            app.playerInfo(args.ID);
            

        }
    )

    .help().argv;
