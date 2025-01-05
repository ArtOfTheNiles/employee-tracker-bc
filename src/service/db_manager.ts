export interface IDepartment { 
    id: string, 
    name: string 
};

export interface IRole { 
    id: string, 
    title: string, 
    salary: number, 
    department_id: number 
};

export interface IEmployee { 
    id: string, 
    first_name: string, 
    last_name: string, 
    role_id: number, 
    manager_id: number 
};

export default class db_manager {
    // #region Getters
    // TODO: These functions should get database information to populate inquirer choices
    public async getEmployees(): Promise<IEmployee[]> {
        return [{ 
            id: 'beep',
            first_name: 'Katelyn',
            last_name: 'Davies',
            role_id: 100,
            manager_id: 100
         },{ 
            id: 'beep2',
            first_name: 'Abbie',
            last_name: 'Marquez',
            role_id: 100,
            manager_id: 100
         },{ 
            id: 'beep3',
            first_name: 'Jennifer',
            last_name: 'Hodges',
            role_id: 100,
            manager_id: 100
         }];
    };
    public async getRoles(): Promise<IRole[]> {
        return [{ 
            id: 'beep',
            title: 'Salaryman',
            salary: 100000.00,
            department_id: 100
         },{
            id: 'beep2',
            title: 'Janitor',
            salary: 100000.00,
            department_id: 100
         },{
            id: 'beep3',
            title: 'Prince',
            salary: 100000.00,
            department_id: 100
         }
        ];
    };
    public async getDepartments(): Promise<IDepartment[]> {
        return [{
            id: 'beep',
            name: 'Accounting',
        },{
            id: 'beepity',
            name: 'Farming',
        },{
            id: 'beepis',
            name: 'Blackmail',
        }];
    };
    // #endregion

    // #region Setters
    public addEmployee(firstName: string, lastName: string, title: string, manager: string):void {
        console.log(`Adding Employee: ${firstName} ${lastName}, ${title}, reports to ${manager}`);
    }
    public addRole(title: string, department: string):void {
        console.log(`Adding Role: ${title} of ${department}`);
    }
    public addDepartment(name: string):void {
        console.log(`Adding Department: ${name}`);
    }
    // #endregion

    // #region Displays
    public async viewEmployees():Promise<void>{
        console.log(`Database Information on Employees`);
    };
    public async viewDepartments():Promise<void>{
        console.log(`Database Information on Departments`);
    };
    public async viewRoles():Promise<void>{
        console.log(`Database Information on Roles`);
    };

    public async viewEmployeesByManager():Promise<void>{
        console.log(`Database Information on Employees by Manager`);
    };
    public async viewEmployeesByDepartment():Promise<void>{
        console.log(`Database Information on Employees by Department`);
    };
    public async viewDepartmentBudget(input: string):Promise<void>{
        console.log(`Database Information on ${input}'s budget`);
    };
    //#endregion
};