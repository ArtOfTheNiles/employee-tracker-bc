import colors from "colors";
import pg from 'pg';
import dotenv from 'dotenv';
import { comingSoon, terminator, starter, lb_plain, separator } from "../prompts/inserts.js";

dotenv.config();
const { Client } = pg;
const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: Number.parseInt(process.env.PORT ? process.env.PORT : '5432'),
});
await client.connect();



export default class db_manager {
    public async disconnect(): Promise<void> {
        await client.end();
    }
    // #region Getters (for Inquirer.js)
    public async getEmployees(): Promise<string[]> {
        await client.connect();
        try {
            const response = await client.query('SELECT first_name last_name FROM employee');
            const stringArray = response.rows.map(row => `${row.last_name}, ${row.first_name}`);
            return stringArray;
        } catch (error) {
            console.error(error);
            return [''];
        } finally {
            await client.end();
        }
    };
    public async getRoles(): Promise<string[]> {
        await client.connect();
        try {
            const response = await client.query('SELECT title FROM role');
            const stringArray = response.rows.map(row => row.title);
            return stringArray;
        } catch (error) {
            console.error(error);
            return [''];
        } finally {
            await client.end();
        }
    };
    public async getDepartments(): Promise<string[]> {
        await client.connect();
        try {
            const response = await client.query('SELECT name FROM department');
            const stringArray = response.rows.map(row => row.name);
            return stringArray;
        } catch (error) {
            console.error(error);
            return [''];
        } finally {
            await client.end();
        }
    };
    // #endregion

    // #region Setters
    public async addEmployee(firstName: string, lastName: string, title: string, manager: string): Promise<void> {
        await client.connect();
        try {
            
        } catch (error) {
            
        } finally {
            await client.end();
        }
        console.log(`Added Employee: ${firstName} ${lastName}, ${title}, reports to ${manager}`);
    }
    public async addRole(title: string, salary: number, department: string): Promise<void> {
        await client.connect();
        try {
            client.query(`INSERT INTO role (title, salary, department_id) VALUES (${title}, ${salary}, ${department})`);
        } catch (error) {
            
        } finally {
            await client.end();
        }

        console.log(`Added Role: ${title} of ${department}`);
    }
    public async addDepartment(name: string): Promise<void> {
        await client.connect();
        try {
            console.log(client.query(`INSERT INTO department (name) VALUES (${name})`));
        } catch (error) {
            
        } finally {
            await client.end();
        }

        console.log(`Added Department: ${name}`);
    }
    // #endregion

    // #region Displays
    public async viewDepartments():Promise<void>{
        console.log(`Database Information on `+colors.yellow(`Departments:`));
        console.log(starter);
        console.log((await client.query('SELECT * FROM department')).rows.map(row =>
            `${row.id.toString().padStart(4, ' ')}: ${row.name.toString().padEnd(36, ' ')}`
        ).join(lb_plain));
        console.log(terminator);
    };
    public async viewRoles():Promise<void>{
        console.log(`Database Information on `+colors.yellow(`Roles:`));
        console.log(starter);
        console.log((await client.query('SELECT title FROM role')).rows.map(row =>
            `    ${row.title.toString().padEnd(36, ' ')}`
        ).join(lb_plain));
        console.log(terminator);
    };
    public async viewEmployees():Promise<void>{
        console.log(`Database Information on `+colors.yellow(`Employees:`));
        console.log(starter);
        console.log((await client.query('SELECT * FROM employee')).rows.map(row =>
            `    ${row.last_name}, ${row.first_name}  `
        ).join(lb_plain));
        console.log(terminator);
    };

    public async viewEmployeesByManager():Promise<void>{
        console.log(`Database Information on `+colors.yellow(`Employees by Manager:`));
        console.log(starter);
        console.log(comingSoon);
        console.log(await client.query(''));
        console.log(terminator);
    };
    public async viewEmployeesByDepartment():Promise<void>{
        console.log(`Database Information on `+colors.yellow(`Employees by Department:`));
        console.log(starter);
        console.log(comingSoon);
        console.log(await client.query(''));
        console.log(terminator);
    };
    public async viewDepartmentBudget(input: string):Promise<void>{
        console.log(`Database Information on `+colors.yellow(`${input}'s Budget:`));
        console.log(starter);
        console.log(comingSoon);
        console.log(await client.query(''));
        console.log(terminator);
    };
    //#endregion
};