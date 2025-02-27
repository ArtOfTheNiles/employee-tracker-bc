import inquirer from "inquirer"; 
import colors from "colors";

import { validateVarchar30, validateFloatingPoint } from "./promptValidation.js";
import db_manager from "../service/db_manager.js";


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
      this.dbManager.addDepartment(title);
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

    const departmentNames: string [] = (await this.dbManager.getDepartments());
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
      this.dbManager.addRole(title, salary, department);
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

    const roleNames: string[] = (await this.dbManager.getRoles());
    const { role } = await inquirer.prompt({
      type: "list",
      name: "role",
      message: `What is ${firstName} ${lastName}'s role in the company?`,
      choices: roleNames, 
    });

    const managerNames: string[] = ['None', ...(await this.dbManager.getEmployees())]
    const { manager } = await inquirer.prompt({
      type: "list",
      name: "manager",
      message: `What is ${firstName} ${lastName}'s direct manager?`,
      choices: managerNames,
      default: 'None',
    });

    const { userValidated } = await inquirer.prompt({ 
      type: 'confirm', 
      name: 'userValidated',
      message: `Does this look correct?\n    New Employee: ${firstName} ${lastName}\n    Assignment: ${role}\n    Reports to: ${manager}`,
    });

    if(userValidated){
      this.dbManager.addEmployee(firstName, lastName, role, manager);
    }
  };
  //#endregion


  //#region View Functions (Passthrough)
  public async viewDepartmentBudgets(): Promise<void> {
    this.dbManager.viewDepartmentBudgets();
  };
  public async viewDepartments(): Promise<void> {
    this.dbManager.viewDepartments();
  }
  public async viewRoles(): Promise<void> {
    this.dbManager.viewRoles();
  }  
  public async viewEmployees(): Promise<void> {
    this.dbManager.viewEmployees();
  }
  public async viewEmployeesByManager(): Promise<void> {
    this.dbManager.viewEmployeesByManager();
  }
  public async viewEmployeesByDepartment(): Promise<void> {
    this.dbManager.viewEmployeesByDepartment();
  }
  //#endregion


  //#region Update Functions
  public async updateEmployeeRole(): Promise<void> {

  }
  public async updateEmployeeManager(): Promise<void> {
    
  }
  //#endregion


  //#region Delete Functions
  public async deleteEmployee(): Promise<void> {

  }
  public async deleteDepartment(): Promise<void> {
    
  }
  public async deleteRole(): Promise<void> {

  }
  //#endregion
}




