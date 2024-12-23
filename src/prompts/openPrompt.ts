import inquirer from "inquirer";

interface link {
    text: string;
    destination: string;
}

const choiceList:link[] = [
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

const promptChoices: string[] = choiceList.map((choice) => choice.text);

export async function openPrompt ():Promise<string> {
    return inquirer.prompt({
        type: 'list',
        name: 'out',
        message: 'What would you like to do?',
        choices: promptChoices,
        default: promptChoices[0],
    }).then((answer) => {
        const foundIt = choiceList.find(item => item.text === answer.out);
        if(foundIt){
            return foundIt.destination;
        }else{
            return 'Error: no such entry available.';
        }
    }).catch((error) => {
        console.error(error);
        return 'Error of unknown cause.';
    });
} 

 
export default openPrompt;