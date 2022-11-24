import React, {useEffect, useState} from 'react';
import {
  Autocomplete,
  Box,
  Container,
  CssBaseline, List,
  ListItem, ListItemButton, ListItemText,
  TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectAvailableUsers, selectChosenUser, selectUser} from "store/selectors";
import {User} from "store/reducers/types/types";
import {deactivateUser} from "store/reducers/actions/deactivateUser";
import {AcceptModal} from "components/acceptModal/AcceptModal";
import {UsersList} from "components";
import {inviteUser} from "store/reducers/actions";
import {setChosenUser} from "store/reducers/appSlice";

export function App() {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);
  const users = useAppSelector(selectAvailableUsers);
  const chosenUser = useAppSelector(selectChosenUser);

  const [showModal, setShowModal] = useState(false);

  const handleUserClick = (user: User) => {
    dispatch(setChosenUser(user));

    setShowModal(true);
  }

  const handleSendInvite = () => {
    console.log(chosenUser)
    dispatch(inviteUser(chosenUser))
  }

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
              <TextField {...params}/>
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

           <UsersList
             users={users}
             currentUser={currentUser}
             userClickCallback={handleUserClick}
           />

          </Box>

        </Box>

        <AcceptModal
          title={'Do you want to play with this user?'}
          isOpen={showModal}
          acceptCallback={handleSendInvite}
          closeCallback={setShowModal}
        />

      </Container>
    </>
  );
}

