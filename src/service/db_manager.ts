interface IDepartment { 
    id: string, 
    name: string 
};

interface IRole { 
    id: string, 
    title: string, 
    salary: number, 
    department_id: number 
};

interface IEmployee { 
    id: string, 
    first_name: string, 
    last_name: string, 
    role_id: number, 
    manager_id: number 
};

export class db_manager {
    // TODO: These functions should get database information to populate inquirer choices
    public async getEmployees():Promise<IEmployee>{
        return { 
            id: 'beep',
            first_name: 'boop',
            last_name: 'bop',
            role_id: 100,
            manager_id: 100
         };
    };
    public async getRoles():Promise<IRole>{
        return { 
            id: 'beep',
            title: 'boop',
            salary: 100000.00,
            department_id: 100
         };
    };
    public async getDepartment():Promise<IDepartment>{
        return { 
            id: 'beep',
            name: 'boop',
         };
    };

    public async viewEmployees():Promise<void>{
        console.log(`Database Information`);
    };
    public async viewDepartments():Promise<void>{
        console.log(`Database Information`);
    };
    public async viewRoles():Promise<void>{
        console.log(`Database Information`);
    };

    public async viewEmployeesByManager():Promise<void>{
        console.log(`Database Information`);
    };

    public async viewEmployeesByDepartment():Promise<void>{
        console.log(`Database Information`);
    };

    public async viewDepartmentBudget(input: string):Promise<void>{
        console.log(`Database Information`);
    };
}