#!/bin/node
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
// Obtain the environment string passed to the node script
const environment = process.argv[2];
// read the content of the json file
const envFileContent = fs.readFileSync(`${__dirname}/${environment}.env`);
// copy the json inside the env.json file
fs.writeFileSync(`.env`, envFileContent);
