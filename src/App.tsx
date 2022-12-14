import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Container, CssBaseline, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks";
import {
  selectAvailableUsers,
  selectChosenUser,
  selectError,
  selectInvitedUser,
  selectIsInviteAccepted,
  selectIsLoading,
  selectIsMeInvited,
  selectRoomId,
  selectUser
} from "store/selectors";
import {User} from "store/reducers/appReducer/types/types";
import {deactivateUser} from "store/reducers/appReducer/actions/deactivateUser";
import {AcceptModal} from "components/acceptModal/AcceptModal";
import {Chat} from "components";
import {inviteUser} from "store/reducers/appReducer/actions";
import {setChosenUser} from "store/reducers/appReducer/appSlice";
import {acceptInvite} from "store/reducers/appReducer/actions/acceptInvite";
import {useNavigate} from "react-router-dom";
import {cancelInvite} from "store/reducers/appReducer/actions/cancelInvite";
import {pickUpInvite} from "store/reducers/appReducer/actions/pickUpInvite";

export function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector(selectUser);
  const users = useAppSelector(selectAvailableUsers);
  const chosenUser = useAppSelector(selectChosenUser);
  const isMeInvited = useAppSelector(selectIsMeInvited);
  const invitedUser = useAppSelector(selectInvitedUser);
  const roomId = useAppSelector(selectRoomId);
  const isLoading = useAppSelector(selectIsLoading);
  const isAccepted = useAppSelector(selectIsInviteAccepted);
  const error = useAppSelector(selectError);

  const [showModal, setShowModal] = useState(false);

  const handleUserClick = (user: User) => {
    dispatch(setChosenUser(user));

    setShowModal(true);
  }

  const handleCloseModal = () => {
    dispatch(pickUpInvite({user: currentUser, competitor: chosenUser}))
    setShowModal(false)
  }

  const handleCloseIsMeInvitedModal = () => {
    dispatch(cancelInvite(invitedUser));
  }

  const handleSendInvite = () => {
    dispatch(inviteUser({user: chosenUser, currentUser}))
  }

  const handleJoinToParty = () => {
    dispatch(acceptInvite(invitedUser))
  }

  useEffect(() => {
    return () => {
      dispatch(deactivateUser());
    }
  }, [])

  useEffect(() => {
    if (roomId) {
      navigate(`/room/${roomId}`)
    }
  }, [roomId])

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
              <TextField {...params} label="Choose someone"/>
            )}
          />
        </Box>

          <Chat
            users={users}
            currentUser={currentUser}
            handleUserClick={handleUserClick}
          />

        <AcceptModal
          title={'Do you want to play with this user?'}
          isOpen={showModal}
          acceptCallback={handleSendInvite}
          closeCallback={handleCloseModal}
          acceptButtonTitle={'Invite'}
          isLoading={isLoading}
          error={error}
          isAccepted={isAccepted}
        />

        <AcceptModal
          title={'Looks like someone wants to play with you!'}
          isOpen={isMeInvited}
          acceptCallback={handleJoinToParty}
          closeCallback={handleCloseIsMeInvitedModal}
          acceptButtonTitle={'Accept'}
          isLoading={isLoading}
          error={error}
          isAccepted={isAccepted}
          />

      </Container>
    </>
  );
}

