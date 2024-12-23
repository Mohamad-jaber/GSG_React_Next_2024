type Operation = '+' | '-';


export const performOperation = (a: number, b: number, operator: Operation): number => {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        default: return NaN;
    }
};

// Expression parsing
export const parseExpression = (expression: string): [number[], Operation[]] => {
    const numbers: number[] = [];
    const operators: Operation[] = [];
    let currentNumber = '';

    for (let char of expression) {
        if (!isNaN(Number(char))) {
            currentNumber += char;
        } else if (char === '+' || char === '-') {
            if (currentNumber) {
                numbers.push(Number(currentNumber));
                currentNumber = '';
            }
            operators.push(char);
        }
    }

    if (currentNumber) {
        numbers.push(Number(currentNumber));
    }

    return [numbers, operators];
};

// Main calculation function
export const calculateExpression = (expression: string): string => {
    try {
        if (!expression) return '';

        const [numbers, operators] = parseExpression(expression);

        if (numbers.length === 0) return '0';
        if (numbers.length !== operators.length + 1) return 'Error';

        let result = numbers[0];

        for (let i = 0; i < operators.length; i++) {
            const nextNumber = numbers[i + 1];
            result = performOperation(result, nextNumber, operators[i]);

            if (isNaN(result)) {
                return 'Error';
            }
        }

        return result.toString();
    } catch (error) {
        return 'Error';
    }
};