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
