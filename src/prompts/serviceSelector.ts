import inquirer from "inquirer";
import colors from "colors";

import db_manager from "../service/db_manager.js";
import CLI from "./cli.js";
import { comingSoon, continuePrompt, goodbyePrompt, serviceSeparator } from "./inserts.js";

const serviceChoices = [
    // Views
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'View Employees by Manager', // EXT
    'View Employees by Department', // EXT
    'View a Department Budget', // EXT
    // Setters
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee Role',
    'Update an Employee Manager', // EXT
    // Deleters (Extended)
    'Delete a Role', 
    'Delete a Department', 
    'Delete an Employee-Entry', 
];

export async function serviceSelector (): Promise<void> {

    const dbManager = new db_manager();
    const cli = new CLI();

    const { output } = await inquirer.prompt({
        type: 'list',
        name: 'output',
        message: colors.blue('What would you like to do?'),
        choices: serviceChoices,
        default: serviceChoices[0],
    })

    switch (output) {
        // Views
        case 'View All Departments':
            await dbManager.viewDepartments();
            break;
        case 'View All Roles':
            await dbManager.viewRoles();
            break;
        case 'View All Employees':
            await dbManager.viewEmployees();
            break;
        case 'View Employees by Manager': // EXT
            await dbManager.viewEmployeesByManager();
            break;
        case 'View Employees by Department': // EXT
            await dbManager.viewEmployeesByDepartment();
            break;
        case 'View a Department Budget': // EXT
            await cli.viewDepartmentBudget();
            break;
        // Setters
        case 'Add a Department':
            await cli.addDepartment();
            break;
        case 'Add a Role':
            await cli.addRole();
            break;
        case 'Add an Employee':
            await cli.addEmployee();
            break;
        case 'Update an Employee Role':
            comingSoon();
            break;
        case 'Update an Employee Manager': // EXT
            comingSoon();
            break;
        // Deleters (Extended)
        case 'Delete a Role': 
            comingSoon();
            break;
        case 'Delete a Department': 
            comingSoon();
            break;
        case 'Delete an Employee-Entry': 
            comingSoon();
            break;
    
        default:
            console.error('No such function, how did you get here?');
            break;
    };

    const { shouldContinue } = await inquirer.prompt({
        type: 'confirm',
        name: 'shouldContinue',
        message: continuePrompt,
    });

    if(shouldContinue){ 
        console.log(serviceSeparator);
        serviceSelector(); 
    }else{
        dbManager.disconnect();
        console.log(goodbyePrompt);
    }
}

export default serviceSelector;