import './App.css';
import Main from './screens/Main.screen';
import About from './screens/About.screen';
import NotFound from './screens/NotFound.screen';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import StudentDetails from './screens/StudentDetails.screen';
import { useEffect, useReducer } from 'react';
import useLocalStorage from './hooks/local-storage.hook';
import { IStudent } from './types';
import AddStudent from './screens/AddStudent.screen';
import reducer from './State/reducer';

const App = () => {
  const h1Style = { color: '#69247C', fontSize: '24px' };

  const initialState = { studentsList: [], totalAbsents: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();

  const { storedData } = useLocalStorage(state.studentsList, 'students-list');

  useEffect(() => {
    dispatch({ type: 'INIT_STUDENTS', payload: storedData || [] });
  }, [storedData]);

  const handleAbsentChange = (id : string, change : number) => {
    dispatch({ type: 'UPDATE_ABSENTS', payload: { id, change } });
  };

  const handleAddStudent = (newStudent : IStudent) => {
    dispatch({ type: 'ADD_STUDENT', payload: newStudent });
  };

  const removeFirst = () => {
    dispatch({ type: 'REMOVE_FIRST_STUDENT' });
  };

  return (
    <div className="main wrapper">
      <h1 style={h1Style}>Welcome to GSG React/Next Course</h1>
      <nav>
        <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home Page</Link>
        <Link to='/add' className={location.pathname === '/add' ? 'active' : ''}>Add Student</Link>
        <Link to='/about' className={location.pathname === '/about' ? 'active' : ''}>About App</Link>
      </nav>
      <Routes>
        <Route path='/' element={
          <Main
            studentsList={state.studentsList}
            totalAbsents={state.totalAbsents}
            onAbsent={handleAbsentChange}
            onRemove={removeFirst}
          />
        } />
        <Route path='/add' element={<AddStudent onAdd={handleAddStudent} />} />
        <Route path='/about' element={<About />} />
        <Route path='/student/:id' element={<StudentDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;