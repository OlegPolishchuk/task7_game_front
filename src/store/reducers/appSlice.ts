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
  inviteAccepted: false,
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
      state.availableUsers = action.payload.filter(user => user.userId !== state.user.userId);
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    setChosenUser: (state, action: PayloadAction<User>) => {
      state.chosenUser = action.payload;
    },

    updateUsersAdd: (state, action: PayloadAction<User>) => {
      state.availableUsers.push(action.payload);
    },

    updateUsersRemove: (state, action: PayloadAction<User>) => {
      state.availableUsers = state.availableUsers
        .filter(user => user.userId !== action.payload.userId)
    },

    setInviteAccepted: (state, action: PayloadAction<boolean>) => {
      state.inviteAccepted = action.payload;
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
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
    builder.addCase(createConnection.fulfilled, (state) => {
      state.isLoading = false
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
  setInviteAccepted,
  setChosenUser,
  setIsLoading,
} = appSlice.actions;