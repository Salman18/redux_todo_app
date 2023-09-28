const INITIAL_STATE = {
  list: [],
  loading: false,
};
export default function todosReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_TODO": {
      return {
        ...state,
        list: [
          ...state.list,

          {
            id: state.list.length + 1,
            completed: false,
            deleted: false,
            task: action.payload,
          },
        ],
      };
    }

    case "REMOVE_TODO": {
      const newState = state.list.filter((item) => item.id !== action.payload);
      return { ...state, list: newState };
    }

    case "TOGGLE_TODO": {
      const updatedState = state.list.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return {
        ...state,
        list: updatedState,
      };
    }

    case "EDIT_TODO": {
      console.log("action.payload.id", action.payload);
      const updatedState = state.list.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, task: action.payload.editText }
          : todo
      );

      return {
        ...state,
        list: updatedState,
      };
    }

    case "SET_LOADER": {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default:
      return state;
  }
}
