import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './App.css';

// based on https://github.com/christiannwamba/scotch-react-todo/blob/master/src/index.jsx

const Title = ({todoCount}) => {
  return (
    <div className="center">
       <div>
          <h1>To-Do ({todoCount})</h1>
       </div>
    </div>
  );
};


const TodoForm = ({addTodo}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form className="center" onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      }}>
      <input ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};


const Todo = ({todo, remove, complete}) => {
  // Each Todo
  var title = ''

  if (todo.completed)
    title = (<strike>{todo.title}</strike>)
  else
    title = (<a href="#" onClick={() => {complete(todo)}}>{todo.title}</a>)
  return (<li>{title} <a href="#" className="delete" onClick={() => {remove(todo.id)}}>delete</a></li>);
};


const TodoList = ({todos, remove, complete}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} complete={complete}/>)
  });
  return (<ol style={{marginTop:'30px'}}>{todoNode}</ol>);
};


// const App = () => {
//   return (<div className="App">Hello World!</div>);
// };

window.id = 0;
class App extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    this.apiUrl = 'http://localhost:5001/api/v1/todos/'
  }
  // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        console.log(res);
        this.setState({data:res.data.data});
      });
  }
  // Add todo handler
  addTodo(val){
    if(val) {
      // Assemble data
      const todo = {title: val, completed: 0}
      // Update data
      axios.post(this.apiUrl, todo)
         .then((res) => {
            todo['id'] = res.data.resourceId
            this.state.data.push(todo);
            this.setState({data: this.state.data});
         });
    }
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl + id)
      .then((res) => {
        this.setState({data: remainder});
      })
  }

  handleComplete(todo){
    const newState = this.state.data.filter((curtodo) => {
      if(curtodo.id === todo.id) curtodo.completed = 1;

      return curtodo;
    });
    todo.completed = 1;

    axios.put(this.apiUrl + todo.id, todo)
      .then((res) => {
        this.setState({data: newState});
      })
  }

  render(){
    // Render JSX
    return (
      <div className="app">
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
          complete={this.handleComplete.bind(this)}
        />
      </div>
    );
  }
}

export default App;