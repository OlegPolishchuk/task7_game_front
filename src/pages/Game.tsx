import React, {useEffect} from 'react';
import {AcceptModal, BoardGame, RedirectHint} from "components";
import {calculateWinner} from "utils/calculateWinner";
import {useAppDispatch, useAppSelector} from "hooks";
import {
  selectBoardState,
  selectCompetitor,
  selectError,
  selectIsCompetitorLeft,
  selectIsGameLoading,
  selectIsMyTurn,
  selectIsTryAgainAccepted,
  selectMySymbol,
  selectRedirectTo,
  selectShowInviteToRestartModal,
  selectUser,
  selectWinner
} from "store/selectors";
import {makeMove} from "store/reducers/gameReducer/actions/makeMove";
import {joinGame} from "store/reducers/gameReducer/actions/joinGame";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Container, LinearProgress, Typography} from "@mui/material";
import {setWinner} from "store/reducers/gameReducer/gameSlice";
import {leaveRoom} from "store/reducers/gameReducer/actions/leaveRoom";
import {
  inviteToRestartGame
} from "store/reducers/gameReducer/actions/intiveToRestartGame";
import {acceptRestartGame} from "store/reducers/gameReducer/actions/acceptRestartGame";


const TIME_TO_REDIRECT = 5000;
const TIMER_STEP = 1000;

export const Game = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const boardState = useAppSelector(selectBoardState);
  const currentUser = useAppSelector(selectUser);
  const competitor = useAppSelector(selectCompetitor);
  const isMyTurn = useAppSelector(selectIsMyTurn);
  const mySymbol = useAppSelector(selectMySymbol);
  const winner = useAppSelector(selectWinner);
  const redirectTo = useAppSelector(selectRedirectTo);
  const isAccepted = useAppSelector(selectIsTryAgainAccepted);
  const error = useAppSelector(selectError);
  const isGameLoading = useAppSelector(selectIsGameLoading);
  const showInviteToRestartModal = useAppSelector(selectShowInviteToRestartModal);
  const isCompetitorLeft = useAppSelector(selectIsCompetitorLeft);

  const {roomId} = useParams();

  const {winnerSymbol, winnerIndexes} = calculateWinner(boardState);
  const isDraw = !winner.userId && !boardState.includes('');
  const showTryAgainButton = winner.userId ? true : isDraw;

  const handleSquareClick = (index: number) => {
    dispatch(makeMove(
      {
        user: currentUser,
        index,
        boardState,
        mySymbol
      }))
  }

  const handleReloadGame = () => {
    dispatch(acceptRestartGame())
  }

  const handleInviteToRestartGame = () => {
    dispatch(inviteToRestartGame());
  }

  const handleLeaveRoom = () => {
    dispatch(leaveRoom(currentUser));
    navigate('/');
  }

  useEffect(() => {
    dispatch(joinGame({user: currentUser, roomId: roomId as string}))
  }, [])

  useEffect(() => {
    if (winnerSymbol) {
      dispatch(setWinner({winnerSymbol, winnerIndexes}))
    }
  }, [winnerSymbol])

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo)
    }
  }, [redirectTo])

  return (
    <Container>

      <Box sx={{
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <Button
          variant={'text'}
          color={'secondary'}
          onClick={handleLeaveRoom}
        >
          Leave room
        </Button>
      </Box>

      {isCompetitorLeft && (
        <RedirectHint
          competitor={competitor}
          redirectUrl={'/'}
          TIME_TO_REDIRECT={TIME_TO_REDIRECT}
          TIMER_STEP={TIMER_STEP}
          callback={handleLeaveRoom}
        />
      )}
      <Box>
        <Typography variant={'h3'} textAlign={'center'}>
          {currentUser.username}({mySymbol})
          <Typography variant={'h2'} mx={'15px'} component={'span'} color={'error.main'}>
            VS
          </Typography>
          {competitor.username}({mySymbol === 'X' ? '0' : 'X'})
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '30px',
        }}>
          <BoardGame
            board={boardState}
            isMyTurn={isMyTurn}
            squareClickCallback={handleSquareClick}
            wonIndexes={winnerIndexes as number[]}
          />

          {isGameLoading && (
            <Box sx={{width: '300px', mt: '30px'}}>
              <LinearProgress/>
            </Box>
          )}

          {showTryAgainButton && (
            <Box sx={{mt: '30px'}}>
              <Button
                variant={'contained'}
                color={'error'}
                onClick={handleInviteToRestartGame}
                disabled={isCompetitorLeft || showInviteToRestartModal || isGameLoading}
              >
                TRY AGAIN
              </Button>
            </Box>
          )}

        </Box>

      </Box>

      <AcceptModal
        title={'Would you like to try again?'}
        isOpen={showInviteToRestartModal}
        acceptCallback={handleReloadGame}
        closeCallback={handleLeaveRoom}
        acceptButtonTitle={'Try again'}
        isAccepted={isAccepted}
        error={error}
        isLoading={false}
      />


    </Container>
  );
};
