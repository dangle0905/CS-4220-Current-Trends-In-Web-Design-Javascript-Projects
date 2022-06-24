// Build in class with yargs
const yargs = require('yargs/yargs');

const app = require('./app.js');

yargs(process.argv.slice(2))
    // the $ 0 will auto matnodech the file name
    // the <> will match up to the .command
    // the [] will match to .options
    .usage('$0: Usage <cmd> [options]')
    .command(
        'draw',
        'draws a card',
        (draw) => {
            return draw.option('s', {
                alias: 'shuffle',
                describe: 'shuffle the deck of cards',
                default: true,
                type: 'boolean'
            });
        },
        (args) => {
            console.log(args);
            // call our application which handles drawing a cards
            app.draw(args);
            
        }
    )
    //creates a command first argument is command, second one is description, third is a builder, and fourth is a helper
    .command({
        command: 'add',
        describe: 'Adds two number',
        builder: {
            firstNumber: {
                describe: 'First Number',
                demandOption: true,  // Required
                type: 'number'     
            },
            secondNumber: {  
                describe: 'Second Number',
                demandOption: true,
                type: 'number'
            }
        },
      
        // Function for your command
        handler(argv) {
            console.log(argv);
            console.log("Result:", 
                (argv.firstNumber+argv.secondNumber))
        }
    })
    .help().argv;
