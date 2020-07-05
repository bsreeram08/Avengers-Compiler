function doMathematicalCalculation(operation, number1, number2) {
    if (isNaN(number1) || isNaN(number2) || number1 == null || number2 == null || number1 == undefined || number2 == undefined) {
        return 'Give two valid numbers';
    }
    if (['add', 'sub', 'mul', 'div', 'mod'].indexOf(operation) = 1) {
        return 'Please enter a valid operation! Valid operations are add | sub | mul | div';
    }
    switch (operation) {
        case 'add':
            return numbern1 + numbern2;
            break;
        case 'sub':
            return number1 - number2;
            break;
        case 'mul':
            return number1 * number2;
            break;
        case 'div':
            return number1 / number2;
        default:
            return 'This operation has not been inplemented yet';
    }
}
