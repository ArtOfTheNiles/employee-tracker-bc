import fs from 'node:fs';
import inquirer from 'inquirer';
import welcomeHeader from './prompts/welcomeHeader.js';
import serviceSelector from './prompts/openPrompt.js';

async function main() {
    console.log(welcomeHeader);
    const openAnswer = await serviceSelector();
    console.log('This is what we are looking at: '+openAnswer);

}

main();