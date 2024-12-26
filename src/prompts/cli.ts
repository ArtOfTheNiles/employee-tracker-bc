import inquirer, { Question } from "inquirer"; 
import colors from "colors";

import { validateVarchar30, validateFloatingPoint } from "./promptValidation.js";

export class CLI {

  //#region Add Functions
  public async addDepartment(): Promise<void> {
    const { title } = await inquirer.prompt({
      type: "input",
      name: "title",
      message: "What is the name of the New Department",
      validate: validateVarchar30,
    });
  
    const { userValidated } = await inquirer.prompt({ 
      type: 'confirm', 
      name: 'userValidated',
      message: `Does this look correct?\n    New Department: ${title}`,
    });

    if(userValidated){
      console.log(colors.green('Department Added Successfully!'));
    }
  };
  
  public async addRole(): Promise<void> {
    const { title } = await inquirer.prompt({
      type: "input",
      name: "title",
      message: "What is the name of the New Role?",
      validate: validateVarchar30,
    });
  
    const { salary } = await inquirer.prompt({
      type: "input",
      name: "salary",
      message: `How much is the base salary for ${title}?`,
      validate: validateFloatingPoint,
    });
  
    const { department } = await inquirer.prompt({
      type: "list",
      name: "department",
      message: `Which Department does this Role belong to?`,
      choices: [], // TODO: Get list of departments from db.
    });
  
    const { userValidated } = await inquirer.prompt({
      type: 'confirm',
      name: 'userValidated',
      message: `Does this look right?\n    New Role: ${title}\n    Part of: ${department}\n    Base Salary: $${salary}`
    });
  
    if(userValidated) {
      console.log(colors.green('Role Added Successfully!'));
    };
  
  };
  
  public async addEmployee(): Promise<void> {
    const { firstName } = await inquirer.prompt({
      type: "input",
      name: "firstName",
      message: "What is the person's first name?",
      validate: validateVarchar30,
    });
  
    const { lastName } = await inquirer.prompt({
      type: "input",
      name: "lastName",
      message: "What is the person's last name?",
      validate: validateVarchar30,
    });
  
    const { role } = await inquirer.prompt({
      type: "list",
      name: "role",
      message: `What is ${firstName} ${lastName}'s role in the company?`,
      choices: [], // TODO: Get list of roles from db.
    });

    const { manager } = await inquirer.prompt({
      type: "list",
      name: "manager",
      message: `What is ${firstName} ${lastName}'s direct manager?`,
      choices: [], // TODO: Get list of employees from db. stretch goal: add a search
    });

    const { userValidated } = await inquirer.prompt({ 
      type: 'confirm', 
      name: 'userValidated',
      message: `Does this look correct?\n    New Employee: ${firstName} ${lastName}\n    Assignment: ${role}\n    Reports to: ${manager}`,
    });

    if(userValidated){
      console.log(colors.green('Department Added Successfully!'));
    }
  };
  //#endregion

  //#region Update Functions
  //#endregion

  //#region Delete Functions
  //#endregion
}




