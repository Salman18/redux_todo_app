export function addTodo(text) {
    return {
      type: 'ADD_TODO',
      payload: text
    }
  }
  
  export function removeTodo(id) {
    return {
      type: 'REMOVE_TODO',
      payload: id
    }
  }


  export function toggleTodo(todo) {
    return {
        type: 'TOGGLE_TODO',
        payload : {
            ...todo,
            completed: true
        }
        
    }
  }


  export function editTodo(editText,id) {
    return {
        type: 'EDIT_TODO',
        payload: {
            editText,
            id
        }
    }
  }

  export function setLoader(payload) {
    return {
        type: 'SET_LOADER',
        payload: payload
    }
  }

  export function addTodoFromApi() {
    return (dispatch, getState) => {
        dispatch(setLoader(true))
        fetch('https://dummyjson.com/todos/1')
        .then(res => res.json())
        .then(data => dispatch(addTodo(data.todo)))
        .catch((e) => console.log(e))
        .finally(() => {
            dispatch(setLoader(false))
        })
    }
  }