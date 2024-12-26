import inquirer from "inquirer";
import serviceList, { useService } from "./routeToServices.js";

const services: string[] = serviceList.map((choice) => choice.text);

export async function serviceSelector ():Promise<string> {
    return inquirer.prompt({
        type: 'list',
        name: 'out',
        message: 'What would you like to do?',
        choices: services,
        default: services[0],
    }).then((answer) => {
        useService(answer.out);
        return ''; //TODO: string return not really the goal? How to use inquirer with services?
    }).catch((error) => {
        console.error(error);
        return 'Error of unknown cause.';
    });
}

export default serviceSelector;