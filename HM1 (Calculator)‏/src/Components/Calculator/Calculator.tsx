import { useState } from "react";
import './Calculator.css'
import Display from "../Display/Display";
import CalculatorButton from "../CalculatorButton/CalculatorButton";
import { calculateExpression } from "../../utils/Logic";

const Calculator = () => {
    const [expression, setExpression] = useState<string>(" ");
    const [result, setResult] = useState<string>(" ");



    const handleNumberClick = (num: string) => {
        setExpression(prev => prev + num);
        setResult("");
    };

    const handleOperatorClick = (operator: string) => {
        setExpression(prev => prev + operator);
        setResult("");
    };

    const handleClear = () => {
        setExpression('');
        setResult("");
    };

    const calculateResult = () => {
        const calculatedResult = calculateExpression(expression);
        setResult(calculatedResult);
    };

    return (
        <div className="calculator">
            <Display expression={expression} result={result} />
            <div className="calculator-grid">
                <div className="grid-row">
                    <CalculatorButton value="7" onClick={() => handleNumberClick('7')} />
                    <CalculatorButton value="8" onClick={() => handleNumberClick('8')} />
                    <CalculatorButton value="9" onClick={() => handleNumberClick('9')} />
                    <CalculatorButton value="C" onClick={handleClear} variant="operator" />
                </div>

                <div className="grid-row">
                    <CalculatorButton value="4" onClick={() => handleNumberClick('4')} />
                    <CalculatorButton value="5" onClick={() => handleNumberClick('5')} />
                    <CalculatorButton value="6" onClick={() => handleNumberClick('6')} />
                    <CalculatorButton value="-" onClick={() => handleOperatorClick('-')} variant="operator" />
                </div>

                <div className="grid-row">
                    <CalculatorButton value="1" onClick={() => handleNumberClick('1')} />
                    <CalculatorButton value="2" onClick={() => handleNumberClick('2')} />
                    <CalculatorButton value="3" onClick={() => handleNumberClick('3')} />
                    <CalculatorButton value="+" onClick={() => handleOperatorClick('+')} variant="operator" />
                </div>

                <div className="grid-row">
                    <CalculatorButton value="0" onClick={() => handleNumberClick('0')}  />
                    <CalculatorButton value="=" onClick={calculateResult} variant="equals" />
                </div>
            </div>
        </div>
    )
}

export default Calculator
