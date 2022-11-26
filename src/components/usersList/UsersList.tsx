import React, {FC} from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import {User} from "store/reducers/appReducer/types/types";

type Props = {
  currentUser: User;
  users: User[];
  userClickCallback: (user: User) => void;
}

export const UsersList: FC<Props> = ({users, currentUser, userClickCallback}) => {

  const handleUserClick = (user: User) => {
    userClickCallback(user);
  }
  console.log(users)
  return (
    <List dense  sx={{width: '100%', padding: '0'}}>

      <ListItem  sx={{
        padding: '10px',
        boxShadow: 2,
        background: 'rgb(245, 246, 247)',
      }}>
        <ListItemText>
          <Box>
            {currentUser.username}(yourself)
          </Box>
        </ListItemText>
      </ListItem>

      {users.map(user => (
        <ListItem
          key={user.userId}
          sx={{padding: '0'}}
          onClick={() => handleUserClick(user)}
        >
          <ListItemButton
            sx={{
            padding: '10px',
            boxShadow: 2,
          }}
            disabled={user.isInGame}
          >
            <ListItemText>
              {user.username}
              {user.isInGame && (
                <Typography variant={'subtitle1'} color={'error.main'}>
                    in game
                </Typography>
              )}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}

    </List>
  );
};
