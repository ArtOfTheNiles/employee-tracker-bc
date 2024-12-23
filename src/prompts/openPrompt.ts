import inquirer from "inquirer";
import serviceList from "./routeToServices.js";

const promptChoices: string[] = serviceList.map((choice) => choice.text);

export async function openPrompt ():Promise<string> {
    return inquirer.prompt({
        type: 'list',
        name: 'out',
        message: 'What would you like to do?',
        choices: promptChoices,
        default: promptChoices[0],
    }).then((answer) => {
        const foundIt = serviceList.find(item => item.text === answer.out);
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