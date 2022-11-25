import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "api";

export const deactivateUser = createAsyncThunk(
  'app/deactivateUser',
  () => {
    API.destroyConnection();
  })