import './Display.css'

interface Iprops {
    expression: string,
    result: string
}

const Display = (props : Iprops) => {

    return(
        <div className="display">
            <div className="expression">
                {props.expression}
            </div>
            <div className="result">
                {props.result}
            </div>
        </div>
    )

}

export default Display;