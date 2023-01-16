import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { commentsAPI } from "../api/api";
import { InitState } from "../type";
import { AddData } from "../type";
import { UpdateData } from "../type";

/* Thunk function */

// [GET - ALL]
export const getCommentsAll = createAsyncThunk(
  "GET_ALL_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await commentsAPI.getCommentsAll();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [GET]
export const getComments = createAsyncThunk(
  "GET_COMMENTS",
  async (payload: number, thunkAPI) => {
    try {
      const { data } = await commentsAPI.getComments(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [POST]
export const addComments = createAsyncThunk(
  "POST_COMMENTS",
  async (payload: AddData, thunkAPI) => {
    try {
      const { data } = await commentsAPI.addComment(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

// [UPDATE]
export const updateComments = createAsyncThunk(
  "UPDATAE_COMMENTS",
  async (payload: UpdateData, thunkAPI) => {
    try {
      console.log(payload);
      const { data } = await commentsAPI.updateComment(payload, payload.id);
      console.log("response", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [DELETE]
export const deleteComments = createAsyncThunk(
  "DELETE_COMMENTS",
  async (payload: number, thunkAPI) => {
    try {
      await commentsAPI.deleteComment(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* InitialState */

const initialState: InitState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentsAll.fulfilled, (state, action) => {
      // Add user to the state array
      state.comments = action.payload;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      console.log(current(state));
      console.log(action);
      state.comments = action.payload;
    });
    builder.addCase(addComments.fulfilled, (state, action) => {
      // Add user to the state array
      state.comments.unshift(action.payload);
      return state;
    });
    builder.addCase(updateComments.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(current(state));
      console.log(action);
      const newState = state.comments.map((item) =>
        action.meta.arg.id === item.id
          ? { ...item, content: action.meta.arg.content }
          : item
      );
      state.comments = newState;
      state.comments.push(action.payload);
      return state;
    });
    builder.addCase(deleteComments.fulfilled, (state, action) => {
      // Add user to the state array
      const newState = state.comments.filter(
        (item) => item.id !== action.payload
      );
      state.comments = newState;
      // state.posts.push(action.payload);
      return state;
    });
  },
});

export default commentsSlice.reducer;
