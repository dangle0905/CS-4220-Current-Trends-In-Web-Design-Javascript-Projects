## How to Use the Card App CLI Dependencies

0. Make sure the `card-app` and the `deckofcards-api` folders are next to each other in the directory.

1. Go into the `deckofcards-api` folder. Once inside the folder run: `npm install`. This will install all the dependencies listed in the package.json.

2. Go into the `card-app` folder. Once inside the folder run: `npm install`. This will install all the dependencies listed in the package.json.

3. From inside the `card-app` To view the help directions for the CLI run: `node cli.js --help`. To view help directions for the play command run: `node cli.js play --help`

4. To run the `cards-app` CLI:

```
    // run the play command with the game argument without passing any options
    node cli.js play 21

    // run the play command with the game argument and pass count as any number
    node cli.js play 21 --count 2
```
