import React, {useEffect} from 'react';
import {
  Autocomplete,
  Box,
  Container,
  CssBaseline, List, ListItem, ListItemButton, ListItemText,
  TextField,
  Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectAvailableUsers, selectChosenUser} from "store/selectors";
import {User} from "store/reducers/types/types";
import {deactivateUser} from "store/reducers/actions/deactivateUser";

function App() {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectAvailableUsers);
  const chosenUser = useAppSelector(selectChosenUser);

  useEffect(() => {
    return () => {
      dispatch(deactivateUser());
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{padding: '30px 0'}}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={users}
            sx={{ width: 300 }}
            getOptionLabel={(option: User) => option.username}
            renderInput={(params) => (
              <TextField {...params} label="Movie" />
            )}
          />
        </Box>

        <Box sx={{
          marginTop: '15px',
          border: '1px solid',
          borderRadius: '5px',
          height: '400px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>

          <Box sx={{
            borderRight: '1px solid',
            flexGrow: '1',
          }}>

          </Box>

          <Box sx={{
            minWidth: '200px',
            overflowY: 'scroll',
          }}>
            <List dense  sx={{width: '100%'}}>

              {users.map(user => (
                <ListItem key={user.userId} sx={{padding: '0'}}>
                  <ListItemButton>
                    <ListItemText>{user.username}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}

            </List>

          </Box>

        </Box>
      </Container>
    </>
  );
}

export default App;
