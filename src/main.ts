import fs from 'node:fs';
import inquirer from 'inquirer';

import serviceSelector from './prompts/serviceSelector.js';
import { welcomeHeader } from './prompts/inserts.js';

async function main() {
    console.log(welcomeHeader);
    await serviceSelector();
}

main();