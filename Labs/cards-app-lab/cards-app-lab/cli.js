const yargs = require('yargs/yargs');

const app = require('./app.js');

yargs(process.argv.slice(2))
    // the $ 0 will auto match the file name
    // the <> will match up to the .command
    // the [] will match to .options
    .usage('$0: Usage <cmd> [options]')
    .command(
        //<game will be a dynamic variable now because it is inside the angle brackets
        'play <game>',
        // description
        'description: play a simple card game',
        // builder
        (yargs) => {
            return yargs
                //example: node cli.js play 21, args.game will be args.game === 21 in handler
                .positional('game', {
                    describe: 'name of the card games',
                    choices: ['21', 'spades'],
                    type: 'string'
                })
                //example: node cli.js play 21 -c=3 will take in three decks, default is one
                .option('c', {
                    alias: 'count',
                    describe: 'the number of decks to use',
                    default: 1,
                    type: 'number'
                });
        },
        // handler takes in the object from yargs and passes thru as args variable
        (args) => {
            if (args.game === '21') {
                app.playGame(args);
            } else {
                console.log(`${args.game} is not ready`);
            }
        }
    )
    .help().argv;
