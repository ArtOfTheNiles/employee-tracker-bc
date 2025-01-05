import inquirer from "inquirer";
import colors from "colors";

import db_manager from "../service/db_manager.js";
import CLI from "./cli.js";
import { comingSoon } from "./inserts.js";



export async function serviceSelector (): Promise<void> {
    inquirer.prompt({
        type: 'list',
        name: 'output',
        message: 'What would you like to do?',
        choices: [
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
        ],
        default: 'View All Employees',
    }).then((answer) => {
        const dbManager = new db_manager();
        const cli = new CLI();
        switch (answer.output) {
            // Views
            case 'View All Departments':
                dbManager.viewDepartments();
                break;
            case 'View All Roles':
                dbManager.viewRoles();
                break;
            case 'View All Employees':
                dbManager.viewEmployees();
                break;
            case 'View Employees by Manager': // EXT
                dbManager.viewEmployeesByManager();
                break;
            case 'View Employees by Department': // EXT
                dbManager.viewEmployeesByDepartment();
                break;
            case 'View a Department Budget': // EXT
                cli.viewDepartmentBudget();
                break;
            // Setters
            case 'Add a Department':
                cli.addDepartment();
                break;
            case 'Add a Role':
                cli.addRole();
                break;
            case 'Add an Employee':
                cli.addEmployee();
                break;
            case 'Update an Employee Role':
                comingSoon;
                break;
            case 'Update an Employee Manager': // EXT
                comingSoon;
                break;
            // Deleters (Extended)
            case 'Delete a Role': 
                comingSoon;
                break;
            case 'Delete a Department': 
                comingSoon;
                break;
            case 'Delete an Employee-Entry': 
                comingSoon;
                break;
        
            default:
                console.error('No such function, how did you get here?');
                break;
        }
    }).catch((error) => {
        console.error(error);
        return 'Error of unknown cause.';
    });
}

export default serviceSelector;