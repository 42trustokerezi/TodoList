import React, { useState,useEffect } from "react";
import "./App.css";
/**Importing Components */
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  
  const [inputText, setInputText] = useState(" ");
  /**State stuff */
  const [todos, setTodos] = useState([]);
  const [status, setstatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  /**Run Once when app starts */
  useEffect(() => {
    getLocalTodos();
  }, []);

  /**UseEffect */
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  /**Functions */
  const filterHandler = ()=> {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
        default:
          setFilteredTodos(todos);
    }
  };

  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') ===null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h2>Trust's Todo List</h2>
      </header>
      <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText} 
      setStatus={setstatus}
      
      />
      <TodoList setTodos={setTodos} 
      todos={todos}
      filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
