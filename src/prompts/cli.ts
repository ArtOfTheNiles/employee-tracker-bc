import inquirer from "inquirer"; 
import colors from "colors";

import { validateVarchar30, validateFloatingPoint } from "./promptValidation.js";
import db_manager, { IDepartment, IRole, IEmployee } from "../service/db_manager.js";
import { tempTelemetry } from "./inserts.js";


export default class CLI {
  dbManager = new db_manager();

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
      // TODO: Add Department To Database
      tempTelemetry();
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

    const departmentNames: string [] = (await this.dbManager.getDepartments()).map(dept => dept.name);
    const { department } = await inquirer.prompt({
      type: "list",
      name: "department",
      message: `Which Department does this Role belong to?`,
      choices: departmentNames,
    });

    const { userValidated } = await inquirer.prompt({
      type: 'confirm',
      name: 'userValidated',
      message: `Does this look right?\n    New Role: ${title}\n    Part of: ${department}\n    Base Salary: $${salary}`
    });

    if(userValidated) {
      // TODO: Add Role To Database
      tempTelemetry();
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

    const roleNames: string[] = (await this.dbManager.getRoles()).map(role => role.title);
    const { role } = await inquirer.prompt({
      type: "list",
      name: "role",
      message: `What is ${firstName} ${lastName}'s role in the company?`,
      choices: roleNames, 
    });

    const managerNames: string[] = (await this.dbManager.getEmployees()).map(employee => `${employee.first_name} ${employee.last_name}`)
    const { manager } = await inquirer.prompt({
      type: "list",
      name: "manager",
      message: `What is ${firstName} ${lastName}'s direct manager?`,
      choices: managerNames,
    });

    const { userValidated } = await inquirer.prompt({ 
      type: 'confirm', 
      name: 'userValidated',
      message: `Does this look correct?\n    New Employee: ${firstName} ${lastName}\n    Assignment: ${role}\n    Reports to: ${manager}`,
    });

    if(userValidated){
      // TODO: Add Employee To Database
      tempTelemetry();
      console.log(colors.green('Department Added Successfully!'));
    }
  };
  //#endregion

  public async viewDepartmentBudget(): Promise<void> {

    const departmentNames: string [] = (await this.dbManager.getDepartments()).map(dept => dept.name);
    const { title } = await inquirer.prompt({
      type: "list",
      name: "title",
      message: "Which Department Budget do you want to view?",
      choices: departmentNames,
    });

    //TODO: figure out how to make the query in psql
    console.log(colors.rainbow(`Lookin' up budget info on ${title}`));
    //BUG: program crashes here
  };

  //#region Update Functions
  //#endregion

  //#region Delete Functions
  //#endregion
}




