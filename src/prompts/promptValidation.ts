export const validateVarchar30 = (input: string): true | string => {
    if (!input.trim()) return "Oops, missing input.";
    if (input.trim().length > 30) return "Sorry, database input is limited to 30 characters for this field."
    return true;
}

export const validateFloatingPoint = (input: string): true | string => {
    if (!input.trim()) return "Oops, missing input.";
    const parsedValue = parseFloat(input);
    if (isNaN(parsedValue)) {
        return "Please enter a valid floating-point number.";
    }
return true;
};

export default validateFloatingPoint;