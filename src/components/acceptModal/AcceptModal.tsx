import React, {FC} from 'react';
import {
  Box,
  Button, CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, IconButton, Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {User} from "store/reducers/types/types";
import {useAppSelector} from "hooks";
import {selectError, selectIsInviteAccepted, selectIsLoading} from "store/selectors";

type Props = {
  title: string;
  isOpen: boolean;
  acceptCallback: () => void;
  closeCallback: (showModal: boolean) => void;
  user?: User;
}

export const AcceptModal: FC<Props> = ({title
                                         ,acceptCallback,
                                         closeCallback,
                                         isOpen,
                                       }) => {

  const isLoading = useAppSelector(selectIsLoading);
  const isAccepted = useAppSelector(selectIsInviteAccepted);
  const error = useAppSelector(selectError);

  const handleClose = () => {closeCallback(false)}
  const handleAccept = () => {acceptCallback()}

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{paddingTop: '40px'}}>
        {!error && title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'red',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {isLoading && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <CircularProgress color="success" />
            <Box sx={{
              fontSize: '14px',
              fontStyle: 'italic',
              color: 'text.secondary'
            }}>
              <span>
              Wait for confirmation from the player
            </span>
            </Box>
          </Box>
        )}

        {error && (
          <Typography variant={'h6'} sx={{color: 'error.main'} }>
            {error}
          </Typography>
        )}

      </DialogContent>

      <DialogActions sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button
          variant={'outlined'}
          color={'success'}
          onClick={handleAccept}
          autoFocus
          disabled={isLoading && !isAccepted}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

