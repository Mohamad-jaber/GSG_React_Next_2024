import { IStudent } from "../types";

interface IState {
    studentsList: IStudent[];
    totalAbsents: number;
}

type Action =
    | { type: "INIT_STUDENTS"; payload: IStudent[] }
    | { type: "ADD_STUDENT"; payload: IStudent }
    | { type: "REMOVE_FIRST_STUDENT" }
    | { type: "UPDATE_ABSENTS"; payload: { id: string; change: number } };

const reducer = (state: IState, action: Action): IState => {
    switch (action.type) {
        case "INIT_STUDENTS":
            return {
                ...state,
                studentsList: action.payload,
                totalAbsents: action.payload.reduce((sum, student) => sum + student.absents, 0),
            };
        case "ADD_STUDENT":
            return {
                ...state,
                studentsList: [action.payload, ...state.studentsList],
            };
        case "REMOVE_FIRST_STUDENT":
            return {
                ...state,
                studentsList: state.studentsList.slice(1),
            };
        case "UPDATE_ABSENTS": {
            const { id, change } = action.payload;
            const updatedList = state.studentsList.map((student) =>
                student.id === id ? { ...student, absents: student.absents + change } : student
            );
            return {
                ...state,
                studentsList: updatedList,
                totalAbsents: state.totalAbsents + change,
            };
        }
        default:
            return state;
    }
};

export default reducer;