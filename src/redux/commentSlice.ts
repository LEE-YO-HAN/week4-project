import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentsAPI } from "../api/api";
import { InitState, AddData, UpdateData } from "../type";

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
      const { data } = await commentsAPI.updateComment(payload, payload.id);
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
  maxDataLength: 0,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentsAll.fulfilled, (state, action) => {
      state.maxDataLength = action.payload.length;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
    builder.addCase(addComments.fulfilled, (state, action) => {
      state.comments.unshift(action.payload);
      state.comments.pop();
      state.maxDataLength += 1;
    });
    builder.addCase(updateComments.fulfilled, (state, action) => {
      const newState = state.comments.map((item) =>
        action.meta.arg.id === item.id
          ? {
              ...item,
              profile_url: action.payload.profile_url,
              author: action.payload.author,
              content: action.payload.content,
              createdAt: action.payload.createdAt,
            }
          : item
      );
      state.comments = newState;
    });
    builder.addCase(deleteComments.fulfilled, (state, action) => {
      const newState = state.comments.filter(
        (item) => item.id !== action.payload
      );
      state.comments = newState;
      state.maxDataLength -= 1;
    });
  },
});

export const commentsAction = commentsSlice.actions;
export default commentsSlice.reducer;
