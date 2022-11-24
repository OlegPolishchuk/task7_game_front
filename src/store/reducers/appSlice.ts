import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialState, User} from "store/reducers/types/types";
import {createConnection} from "store/reducers/actions";

const initialState: InitialState = {
  user: { username: '',userId: '' },
  chosenUser: { username: '',userId: '' },
  availableUsers: [],
  error: '',
  isLoading: false,
  isActive: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },

    setAvailableUsers: (state, action: PayloadAction<User[]>) => {
      state.availableUsers = action.payload;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    updateUsersAdd: (state, action: PayloadAction<User>) => {
      state.availableUsers.push(action.payload);
    },

    updateUsersRemove: (state, action: PayloadAction<User>) => {
      state.availableUsers = state.availableUsers
        .filter(user => user.userId !== action.payload.userId)
    },

  },

  extraReducers: (builder => {
    builder.addCase(createConnection.pending, (state) => {
      state.error = '';
      state.isLoading = true;
    })
    builder.addCase(createConnection.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
  })

})


export const appReducer = appSlice.reducer;
export const {
  setError,
  setIsActive,
  setUser,
  setAvailableUsers,
  updateUsersRemove,
  updateUsersAdd,
} = appSlice.actions;