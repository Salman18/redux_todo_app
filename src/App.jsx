import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, editTodo,addTodoFromApi } from "./actions";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [editText, setEditText] = useState(""); // Track the text of the task being edited
  const [editMode, setEditMode] = useState(null); // Track the edit mode for a task, null means no task in edit mode

  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(addTodoFromApi())
    // dispatch({
    //   type: 'ADD_TODO',
    //   payload: 'First task'
    // })
  }, [])


  const startEdit = (todo) => {
    setEditText(todo.task); 
    setEditMode(todo.id);
  };



  const {list:todos, loading} = useSelector((store) => store.todos);

  const handleAddTodo = () => {
    if (input.length !== 0) {
      dispatch(addTodo(input));
      setInput("")
    }
  };

  const removeTodos = (id) => {
    dispatch(removeTodo(id));
  };

  // const toggleTodos = (todo) => {
  //   dispatch(toggleTodo(todo));
  // };

  

  const saveEdit = (editText,id) => {
    dispatch(editTodo(editText,id));
    setEditMode(null); 
  };

  
if(loading) {
 return  <h1>Loading....!</h1>
}

  return (
    <>
      <h1>Todo app</h1>
      <div>
        <input onChange={(e) => setInput(e.target.value)} value={input} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      {todos?.map((todo) => (
        <div
          key={todo.id}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {editMode === todo.id ? ( 
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => saveEdit(editText, todo.id)}>Save</button>
            </>
          ) : (
            <>
              <p onClick={() => startEdit(todo)}>{todo.task}</p>
              <span onClick={() => removeTodos(todo.id)} style={{ marginLeft: 8, cursor: 'pointer' }}>
                ❌
              </span>
            </>
          )}
        </div>
      ))}
     
    </>
  );
}

export default App;
