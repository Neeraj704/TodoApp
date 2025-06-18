import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import axios from 'axios'
import SideBar from './components/SideBar';
import BasicText from './components/BasicText';
import Theme from './components/Theme';
import TodoCard from './components/TodoCard';
import Modal from 'react-modal';


Modal.setAppElement('#root');

function App() { 
  const [allTodos, setAllTodos] = useState([]);

  axios.interceptors.request.use(
    function (config) {
      const token = sessionStorage.getItem('jwtToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const getTodos = async () => {
    const res = await axios.get('http://localhost:3000/read');
    console.log("Fetched Todos:", res.data.todos);
    setAllTodos(res.data.todos); 
  };

  useEffect(() => {
    getTodos();
  }, []);
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/home" element={
          <> 
          <div className='mb-5'>TESTING</div>
          <BasicText></BasicText>
          <SideBar getTodos = {getTodos}></SideBar>
          <Theme></Theme>
          <div>
            {allTodos.map((todo, index) => (
              <TodoCard
                key={todo._id || index}
                title={todo.title}
                description={todo.description}
                date={todo.date}
                status={todo.status}
              />
            ))}
          </div>
          </>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
