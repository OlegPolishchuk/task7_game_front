import React, {FormEvent, useEffect, useState} from 'react';
import bg_login from 'assets/bg_login.png'
import {Box, Button, Container, TextField} from "@mui/material";
import {useAppSelector} from "hooks/useAppSelector";
import {selectError, selectIsActive} from "store/selectors";
import {useAppDispatch} from "hooks/useAppDispatch";
import {setError} from "store/reducers/appReducer/appSlice";
import {createConnection} from "store/reducers/appReducer/actions/activateUser";
import {useNavigate} from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector(selectError);
  const isActive = useAppSelector(selectIsActive);

  const [username, setUsername] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isInputValid(username)) {
     return dispatch(setError('Invalid username'))
    }

    dispatch(createConnection(username))
  }

  const handleInputFocus = () => {
    dispatch(setError(''))
  }

  const isInputValid = (value: string) => {
    return value.trim().length > 0
  }

  useEffect(() => {
    if (isActive) {
      navigate('/')
    }
  }, [isActive])

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      gap: '40px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>

      <TextField
        error={!!error}
        label='Username'
        variant="standard"
        value={username}
        helperText={error}
        onFocus={handleInputFocus}
        onChange={e => setUsername(e.currentTarget.value)}
      />

      <Button type={'submit'}>Login</Button>

    </Box>
  );
};
