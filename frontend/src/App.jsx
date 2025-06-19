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
import 'react-datepicker/dist/react-datepicker.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TrashBin from './components/TrashBin';


Modal.setAppElement('#root');

function App() { 
  const [allTodos, setAllTodos] = useState([]);
  const [isDraggingAnyTodo, setIsDraggingAnyTodo] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

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

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleDeleteTodo = async (todo) => {
    await axios.delete('http://localhost:3000/delete', {
      data: {
        title: todo.title,
        description: todo.description,
      },
    });
    await getTodos();
};

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
    
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Routes className='dark:bg-[#343539]'>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/home" element={
            <>
            <div className='flex bg-[#FFFDFA] dark:bg-[#343539] h-full min-h-screen'>
              <div className='w-[112px]'> 
                <SideBar getTodos = {getTodos} darkMode={darkMode}></SideBar>
              </div>
              <div className='flex flex-1 flex-col max-w-full ml-[120px] mr-[120px]'> 
                <div>
                  <BasicText getTodos = {getTodos} darkMode={darkMode} setDarkMode={setDarkMode}></BasicText>
                </div>
                <div className='flex flex-wrap'>
                  {allTodos.map((todo, index) => (
                    <TodoCard
                      darkMode={darkMode}
                      key={todo._id || index}
                      title={todo.title}
                      description={todo.description}
                      date={todo.date}
                      status={todo.status}
                      onStartDrag={() => setIsDraggingAnyTodo(true)}
                      onEndDrag={() => setIsDraggingAnyTodo(false)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <TrashBin show={isDraggingAnyTodo} onDropTodo={handleDeleteTodo}/>
            </>
          }>
          </Route>
        </Routes>
      </BrowserRouter>
    </DndProvider>
    </>
  )
}

export default App
