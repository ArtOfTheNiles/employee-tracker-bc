import colors from "colors";
import pg from 'pg';
import dotenv from 'dotenv';
import { terminator, starter, lb_plain } from "../prompts/inserts.js";

dotenv.config();
//TODO: Switch to POOL
const pool = new pg.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: Number.parseInt(process.env.PORT ? process.env.PORT : '5432'),
});

export default class db_manager {
    // #region Displays
    public async viewDepartments():Promise<void>{
        await pool.connect();
        
        console.log(`Database Information on `+colors.yellow(`Departments:`));
        console.log(starter);
        try {
            const result = await pool.query('SELECT * FROM department');
            console.log(result.rows.map(row =>
                `${row.id.toString().padStart(4, ' ')}: ${row.name.toString().padEnd(36, ' ')}`
            ).join(lb_plain));
        } catch (error) {
            console.error(error);
        }
        console.log(terminator);
    };
    public async viewRoles():Promise<void>{
        await pool.connect();
        
        console.log(`Database Information on `+colors.yellow(`Roles:`));
        console.log(starter);
        try {
            console.log((await pool.query('SELECT title FROM role')).rows.map(row =>
                `    ${row.title.toString().padEnd(36, ' ')}`
            ).join(lb_plain));
        } catch (error) {
            console.error(error);
        }
        console.log(terminator);
    };
    public async viewEmployees():Promise<void>{
        await pool.connect();
        
        console.log(`Database Information on `+colors.yellow(`Employees:`));
        console.log(starter);
        try {
            console.log((await pool.query('SELECT * FROM employee')).rows.map(row =>
                `    ${row.last_name}, ${row.first_name}  `
            ).join(lb_plain));
        } catch (error) {
            console.error(error);
        }
        console.log(terminator);
    };
    public async viewEmployeesByManager():Promise<void>{
        await pool.connect();
        
        console.log(`Database Information on `+colors.yellow(`Employees by Manager:`));
        console.log(starter);
        try {
            // console.log(comingSoon);
            console.log(await pool.query(''));
        } catch (error) {
            console.error(error);
        }
        console.log(terminator);
    };
    public async viewEmployeesByDepartment():Promise<void>{
        await pool.connect();
        
        console.log(`Database Information on `+colors.yellow(`Employees by Department:`));
        console.log(starter);
        try {
            // console.log(comingSoon);
            console.log(await pool.query(''));
        } catch (error) {
            console.error(error);
        }
        console.log(terminator);
    };
    public async viewDepartmentBudget(input: string):Promise<void>{
        await pool.connect();
        
        console.log(`Database Information on `+colors.yellow(`${input}'s Budget:`));
        console.log(starter);
        try {
            // console.log(comingSoon);
            console.log(await pool.query(''));
        } catch (error) {
            console.error(error);
        }
        console.log(terminator);
    };
    //#endregion


    // #region Setters
    public async addEmployee(firstName: string, lastName: string, title: string, manager?: string): Promise<void> {
        await pool.connect();
        try {
            let managerID = null;
            const roleID = pool.query(`SELECT id FROM role WHERE title ='${title}'`);
            if(manager && manager != 'None') {
                // getEmployees() response in 'last_name, first_name' format
                const managerName: string[] = manager.split(', ');
                managerID = pool.query(`SELECT id FROM employee WHERE first_name = '${managerName[1]}' AND last_name = '${managerName[0]}'`);
                if(!managerID){
                    console.error(`Error: Manager entry ${manager} not found in database!`);
                }
            }
            pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${firstName},${lastName},${roleID},${managerID})`)
        } catch (error) {
            console.error(error);
        }
        // console.log(`Added Employee: ${firstName} ${lastName}, ${title}, reports to ${manager}`);
        this.viewEmployees();
    }
    public async addRole(title: string, salary: number, department: string): Promise<void> {
        await pool.connect();
        try {
            pool.query(`INSERT INTO role (title, salary, department_id) VALUES (${title}, ${salary}, ${department})`);
        } catch (error) {
            console.error(error);
        }
        // console.log(`Added Role: ${title} of ${department}`);
        this.viewRoles();
    }
    public async addDepartment(name: string): Promise<void> {
        await pool.connect();
        try {
            console.log(pool.query(`INSERT INTO department (name) VALUES (${name})`));
        } catch (error) {
            console.error(error);
        }        
        // console.log(`Added Department: ${name}`);
        this.viewDepartments();
    }
    // #endregion


    // #region Getters (for Inquirer.js)
    public async getEmployees(): Promise<string[]> {
        await pool.connect();
        try {
            const response = await pool.query('SELECT first_name last_name FROM employee');
            const stringArray = response.rows.map(row => `${row.last_name}, ${row.first_name}`);
            return stringArray;
        } catch (error) {
            console.error(error);
            return [''];
        }
    };
    public async getRoles(): Promise<string[]> {
        await pool.connect();
        try {
            const response = await pool.query('SELECT title FROM role');
            const stringArray = response.rows.map(row => row.title);
            return stringArray;
        } catch (error) {
            console.error(error);
            return [''];
        }
    };
    public async getDepartments(): Promise<string[]> {
        await pool.connect();
        try {
            const response = await pool.query('SELECT name FROM department');
            const stringArray = response.rows.map(row => row.name);
            return stringArray;
        } catch (error) {
            console.error(error);
            return [''];
        }
    };
    // #endregion
};