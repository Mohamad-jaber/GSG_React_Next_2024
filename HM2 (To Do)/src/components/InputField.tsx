import React from "react";
import "./style.css";

interface IProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }:IProps) => {

    return (
        <form
            className="input"
            onSubmit={(e) => {
                handleAdd(e);
            }}
        >
            <input
                type="text"
                placeholder="Enter a Task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className="input__box"
            />
            <button type="submit" className="input_submit">
                GO
            </button>
        </form>
    );
};

export default InputField;