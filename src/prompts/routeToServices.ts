interface link {
    text: string; // How to refer to collective service via interface
    service_prompt: string; // inquirer.js prompts
    service_db: string; // database interaction services
}

export const serviceList:link[] = [
    {
        text:'View All Departments', 
        service_prompt: '',
        service_db: '../service/viewDepartments.ts'
    },{
        text:'View All Roles', 
        service_prompt: '',
        service_db:'../service/viewRoles.ts'
    },{
        text:'View All Employees', 
        service_prompt: '',
        service_db:'../service/viewEmployees.ts'
    },{
        text:'Add a Department',
        service_prompt: '', 
        service_db:'../service/addDepartment.ts'
    },{
        text:'Add a Role', 
        service_prompt: '',
        service_db:'../service/addRole.ts'
    },{
        text:'Add an Employee', 
        service_prompt: '',
        service_db:'../service/addEmployee.ts'
    },{
        text:'Update an Employee Role', 
        service_prompt: '',
        service_db:'../service/updateEmployee.ts'
    }
    // /*Extended Options 
    ,{
        text:'View Employees by Manager', 
        service_prompt: '',
        service_db:'../service/extended/viewEmployeesByManager.ts'
    },{
        text:'View Employees by Department', 
        service_prompt: '',
        service_db:'../service/extended/viewEmployeesByDepartment.ts'
    },{
        text:'View a Department Budget', 
        service_prompt: '',
        service_db:'../service/extended/viewDepartmentBudget.ts'
    },{
        text:'Update an Employee Manager', 
        service_prompt: '',
        service_db:'../service/extended/updateEmployeeManager.ts'
    },{
        text:'Delete a Role', 
        service_prompt: '',
        service_db:'../service/extended/deleteRole.ts'
    },{
        text:'Delete a Department', 
        service_prompt: '',
        service_db:'../service/extended/deleteDepartment.ts'
    },{
        text:'Delete an Employee Entry', 
        service_prompt: '',
        service_db:'../service/extended/deleteEmployee.ts'
    }
    // */
];

export async function useService(serviceName: string) {
    const foundLink = serviceList.find(service => service.service_db === serviceName);
    if(foundLink){
        const module = await import(foundLink.service_db);
        if(module.execute){
            module.execute();
        }
    }else{
        console.error(`${serviceName} service not found!`)
    }
}

export async function summonPrompt(servicePrompt: string) {
    const foundLink = serviceList.find(service => service.service_prompt === servicePrompt);
    if(foundLink){
        const module = await import(foundLink.service_prompt);
        // TODO connect!
    }else{
        console.error(`${servicePrompt} inquirer prompt not found!`)
    }
}

export default serviceList;