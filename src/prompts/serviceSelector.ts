import inquirer from "inquirer";
import colors from "colors";

import CLI from "./cli.js";
import { continuePrompt, goodbyePrompt, serviceSeparator } from "./inserts.js";
import delay from "../service/utilities.js";

const cli = new CLI();

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

async function serviceSwitch(service: string){
    switch (service) {
        // Views
        case 'View All Departments':
            await cli.viewDepartments();
            break;
        case 'View All Roles':
            await cli.viewRoles();
            break;
        case 'View All Employees':
            await cli.viewEmployees();
            break;
        case 'View Employees by Manager':
            await cli.viewEmployeesByManager();
            break;
        case 'View Employees by Department':
            await cli.viewEmployeesByDepartment();
            break;
        case 'View a Department Budget':
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
            await cli.updateEmployeeRole();
            break;
        case 'Update an Employee Manager':
            await cli.updateEmployeeManager();
            break;
        // Deleters (Extended)
        case 'Delete a Role': 
            await cli.deleteRole();
            break;
        case 'Delete a Department': 
            await cli.deleteDepartment();
            break;
        case 'Delete an Employee-Entry': 
            await cli.deleteEmployee();
            break;
    
        default:
            console.error('No such function, how did you get here?');
            break;
    };
};

async function shouldContinue(){
    await delay(300);
    const { shouldContinue } = await inquirer.prompt({
        type: 'confirm',
        name: 'shouldContinue',
        message: continuePrompt,
    });

    if(shouldContinue){ 
        console.log(serviceSeparator);
        await serviceSelector(); 
    }else{
        console.log(goodbyePrompt);
    }
};

export async function serviceSelector (): Promise<void> {

    const { output } = await inquirer.prompt({
        type: 'list',
        name: 'output',
        message: colors.blue('What would you like to do?'),
        choices: serviceChoices,
        default: serviceChoices[0],
    })

    await serviceSwitch(output);


    await shouldContinue();
};

export default serviceSelector;