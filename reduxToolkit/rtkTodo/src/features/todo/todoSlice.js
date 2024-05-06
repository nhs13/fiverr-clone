// nanoid is an id generator
import {createSlice, nanoid} from '@reduxjs/toolkit'

const intialState = { 
    todos: [ {id: 1, text: "reference"} ],
}


// in contextAPI we only declare the var and fns here
// and define them in App.jsx, in rtk we do it here only
export const todoSlice = createSlice({
    name: "todo",   // name of slice
    initialState: intialState,
    reducers: {
        // contains properties and fns
        addTodo: (state, action)=>{
            const newTodo = {
                id: nanoid(), 
                text: action.payload
            }
            state.todos.push(newTodo)
        },
        removeTodo: (state, action)=>{
            const removalId = action.payload
            state.todos = state.todos.filter((curr)=>
                curr.id !== removalId
            )
        },
        // removeTodo: (state, action) => {
        //     console.log(action.payload)
        //     state.todos = state.todos.filter((todo) => todo.id !== action.payload )
        // },
        updateTodo: (state, action) =>{
            const {updationId, newText} = action.payload;
            const todoToUpdate = state.todos.find((curr)=> curr.id === updationId);
            if (todoToUpdate !== undefined && todoToUpdate !== null) {
                todoToUpdate.text = newText;
              }
              
        } 
    }
})

// exporting indivisual functionalities to be used inside compoenents
export const {addTodo, removeTodo, updateTodo} = todoSlice.actions
// exporting the set of reducers to be registered in the store
export default todoSlice.reducer