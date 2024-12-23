interface link {
    text: string;
    destination: string;
}

export const serviceList:link[] = [
    {
        text:'View All Departments', 
        destination: '../service/viewDepartments.ts'
    },{
        text:'View All Roles', 
        destination:'../service/viewRoles.ts'
    },{
        text:'View All Employees', 
        destination:'../service/viewEmployees.ts'
    },{
        text:'Add a Department', 
        destination:'../service/addDepartment.ts'
    },{
        text:'Add a Role', 
        destination:'../service/addRole.ts'
    },{
        text:'Add an Employee', 
        destination:'../service/addEmployee.ts'
    },{
        text:'Update an Employee Role', 
        destination:'../service/updateEmployee.ts'
    }
    /*Extended Options 
    ,{
        text:'View Employees by Manager', 
        destination:'../service/extended/viewEmployeesByManager.ts'
    },{
        text:'View Employees by Department', 
        destination:'../service/extended/viewEmployeesByDepartment.ts'
    },{
        text:'View a Department Budget', 
        destination:'../service/extended/viewDepartmentBudget.ts'
    },{
        text:'Update an Employee Manager', 
        destination:'../service/extended/updateEmployeeManager.ts'
    },{
        text:'Delete a Role', 
        destination:'../service/extended/deleteRole.ts'
    },{
        text:'Delete a Department', 
        destination:'../service/extended/deleteDepartment.ts'
    },{
        text:'Delete an Employee Entry', 
        destination:'../service/extended/deleteEmployee.ts'
    }
    */
];

export async function useService(serviceName: string) {
    const foundLink = serviceList.find(service => service.text === serviceName);
    if(foundLink){
        const module = await import(foundLink.destination);
        if(module.execute){
            module.execute();
        }
    }else{
        console.error(`${serviceName} service not found!`)
    }
}

export default serviceList;