const yargs = require('yargs/yargs');

const app = require('./app.js');

yargs(process.argv.slice(2))
    .usage('$0: Usage <cmd> [options]')
    .command(
        // command
        'play <game>',
        // command description
        'play cards games',
        // builder
        (yargs) => {
            return yargs
                .positional('game', {
                    describe: 'name of the card game',
                    type: 'string',
                    choices: ['21', 'spades', 'go-fish']
                })
                .option('c', {
                    alias: 'count',
                    describe: 'the number of decks to use when playing',
                    default: 1,
                    type: 'number'
                });
        },
        // handler
        (args) => {
            if (args.game === '21') {
                app.playGame(args);
            } else {
                console.log(`${args.game} is not ready`);
            }
        }
    )
    .help().argv;
