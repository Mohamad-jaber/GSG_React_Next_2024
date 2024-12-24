import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";


interface IProps {
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList = ({ todos, setTodos }: IProps) => {
    return (
        <div className="container">
            <div className='todos'>
                <span className="todos__heading">Active Tasks</span>
                {todos?.map((todo) => (
                    todo.isDone == false &&
                    <SingleTodo
                        todos={todos}
                        todo={todo}
                        key={todo.id}
                        setTodos={setTodos}
                    />
                ))}
            </div>
            <div className='todosCompleted'>
                <span className="todos__heading">Completed Tasks</span>
                {todos?.map((todo) => (
                    todo.isDone == true &&
                    <SingleTodo
                        todos={todos}
                        todo={todo}
                        key={todo.id}
                        setTodos={setTodos}
                    />
                ))}

            </div>
        </div>
    );
};

export default TodoList;