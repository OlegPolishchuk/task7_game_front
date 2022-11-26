import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, TextField, Typography} from "@mui/material";
import {UsersList} from "components/usersList/UsersList";
import {User} from "store/reducers/appReducer/types/types";
import {useAppDispatch, useAppSelector} from "hooks";
import {sendMessage} from "store/reducers/appReducer/actions/sendMessage";
import {selectMessages} from "store/selectors";

type Props = {
  users: User[];
  currentUser: User;
  handleUserClick: (user: User) => void;
}

export const Chat: FC<Props> = ({users, currentUser, handleUserClick}) => {
  const dispatch = useAppDispatch();
  const textRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const messages = useAppSelector(selectMessages);

  const handleSendMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {

      let value = textRef.current?.value;

      if (value?.trim().length) {
        dispatch(sendMessage({message: value, user: currentUser}))
        textRef.current!.value = '';
      }
    }
  }

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  return (
    <Box sx={{
      marginTop: '15px',
      border: '1px solid rgba(209, 205, 205)',
      borderRadius: '5px',
      background: '#fff',
      height: '400px',
      display: 'flex',
      justifyContent: 'space-between',
    }}>

      <Box sx={{
        borderRight: '1px solid rgba(209, 205, 205)',
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{
          height: '100%',
          padding: '15px',
          overflowY: 'scroll',
          textAlign: 'right',
        }}>
          {messages.map((message, index) => (
            <Typography
              key={`${index}${message}`}
              variant={'body2'}
              component={'p'}
              mt={'10px'}
              color={'text.primary'}
            >
              {message.message}
              <Typography
                variant={'body2'}
                component={'span'}
                ml={'8px'}
                color={'secondary.main'}
              >
                ({message.user.username})
              </Typography>
            </Typography>
          ))}
          <div ref={chatBottomRef} />
        </Box>

        <Box sx={{
          width: '100%',
          marginTop: 'auto',
        }}>
          <TextField
            inputRef={textRef}
            fullWidth
            id="filled-basic"
            placeholder={'write something'}
            variant="outlined"
            onKeyPress={handleSendMessage}
            sx={{'&:focus': {border: 'none'}}}
          />
        </Box>
      </Box>

      <Box sx={{
        minWidth: '200px',
        overflowY: 'scroll',
      }}>

        <UsersList
          users={users}
          currentUser={currentUser}
          userClickCallback={handleUserClick}
        />

      </Box>

    </Box>
  );
};