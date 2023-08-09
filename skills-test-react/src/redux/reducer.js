const initialState = {
  openForm: false,
  todo: ""
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_FORM":
      return { ...state, openForm: !state.openForm }
    case "UPDATE TODO":
      return { ...state, todo: action.payload }
    default:
      return state
  }
}

export default reducer