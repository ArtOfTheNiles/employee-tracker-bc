import fs from 'node:fs';
import inquirer from 'inquirer';

import welcomeHeader from './prompts/welcomeHeader.js';
import serviceSelector from './prompts/serviceSelector.js';

async function main() {
    console.log(welcomeHeader);
    await serviceSelector();
}

main();