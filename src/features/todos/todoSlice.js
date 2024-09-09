import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const todoSlice = createSlice({
    name : "todos",
    initialState: {
        allTodos : [],
        edit : {todo : {} , isEdit : false},
        isLoading : false,
        isError : false,
        isSuccess : false,
    },
    reducers: {
      removeTodo : (state , action) => {
        return{
          ...state,
          allTodos : state.allTodos.filter(item => item._id !== action.payload)
        };
      },

        edit: (state , action) => {
          return{
            ...state,
            edit : {todo : action.payload , isEdit : true },
          }
        }

    },
    extraReducers: (builder) => {
        builder
      .addCase(getTodos.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allTodos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(addTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allTodos = [...state.allTodos, action.payload];
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allTodos = state.allTodos.map(item => item._id === action.payload._id ? action.payload : item)
        state.edit = {todo : {} , isEdit :  false }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

    },
});

export const {removeTodo , edit} = todoSlice.actions
export default todoSlice.reducer;

// Get Todo

export const getTodos = createAsyncThunk("FETCH/TODOS" , async() => {
    const response = await axios.get("/api/todo");
    return response.data;
})

// Create Todo

export const addTodo = createAsyncThunk("ADD/TODO" , async(formData) => {
  const response = await axios.post("/api/todo", formData);
  return response.data
})

// Delete Todo 
 export const deleteTodo = createAsyncThunk("DELETE/TODO" , async(id) => {
  const response = await axios.delete("/api/todo/" + id)
  return response.data
 })

 // Update Todo
 export const updateTodo = createAsyncThunk("UPDATA/TODO" , async(updatedTodo) => {
  const response = await axios.put("/api/todo/" + updatedTodo._id , updatedTodo)
  return response.data
 })