import serviceSelector from './prompts/serviceSelector.js';
import { welcomeHeader } from './prompts/inserts.js';
import tempStartup from './service/db_setup.js';


async function main() {
    // tempStartup();
    console.log(welcomeHeader);
    await serviceSelector();
}


main();