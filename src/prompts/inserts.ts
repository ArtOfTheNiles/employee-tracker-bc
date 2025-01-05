import colors from "colors";

const welcomeText = [
    colors.underline(colors.cyan('Welcome to the ')),
    colors.bgBlue(' Employee Management System'+colors.green('™ \n')),
];
export const welcomeHeader = welcomeText.join('');

const continueText = [
    colors.white('Would you like to '),
    colors.underline(colors.green('Continue')),
    colors.white(' to '),
    colors.green('Another Service'),
    colors.white('?')
]
export const continuePrompt = continueText.join('');

const goodbyeText = [
    colors.underline(colors.cyan('Thanks for using the ')),
    colors.bgBlue(' Employee Management System'+colors.green('™ \n\n')),
    '                                    ',
    colors.white('Have a '),
    colors.rainbow('Nice Day!'),
]
export const goodbyePrompt = goodbyeText.join('');

export const comingSoon = ():void => {
    console.log(colors.bgRed('FUNCTION IMPLEMENTATION INCOMING...'));
};
export const tempTelemetry = (): void => {
    console.log(colors.gray('v v v   This is when you should see:   v v v'));
};