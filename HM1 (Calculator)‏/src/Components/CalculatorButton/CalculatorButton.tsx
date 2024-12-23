
interface IProps {
    value: string;
    onClick: () => void;
    variant?: 'number' | 'operator' | 'equals';
}

const CalculatorButton = (props: IProps) => {

    const getButtonClass = () => {
        switch (props.variant) {
            case 'operator':
                return 'button-operator';
            case 'equals':
                return 'button-equals';
            default:
                return 'button-number';
        }
    };


    return (
        <button
            onClick={props.onClick}
            className={`button ${getButtonClass()}`}
        >
            {props.value}
        </button>
    );

}

export default CalculatorButton;