import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "api";
import {User} from "store/reducers/appReducer/types/types";

export const sendMessage = createAsyncThunk(
  'app/sendMessage',
  ({message, user}: {message: string, user: User}, {dispatch}) => {

    API.sendMessage(message, user)

  }
)