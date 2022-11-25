import React, {FC} from 'react';
import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
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

  return (
    <List dense  sx={{width: '100%', padding: '0'}}>

      <ListItem  sx={{padding: '0 10px', background: '#F1F1F1'}}>
        <ListItemText>
          <Box sx={{
            fontWeight: 'bold',
          }}>
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
          <ListItemButton>
            <ListItemText>{user.username}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}

    </List>
  );
};
