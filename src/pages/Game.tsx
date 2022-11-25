import React, {useEffect} from 'react';
import {AcceptModal, BoardGame} from "components";
import {calculateWinner} from "utils/calculateWinner";
import {useAppDispatch, useAppSelector} from "hooks";
import {
  selectBoardState,
  selectCompetitor, selectError, selectIsLoading,
  selectIsMyTurn, selectIsTryAgainAccepted,
  selectMySymbol,
  selectRedirectTo,
  selectUser,
  selectWinner
} from "store/selectors";
import {makeMove} from "store/reducers/gameReducer/actions/makeMove";
import {joinGame} from "store/reducers/gameReducer/actions/joinGame";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Container, Typography} from "@mui/material";
import {setWinner} from "store/reducers/gameReducer/gameSlice";
import {leaveRoom} from "store/reducers/gameReducer/actions/leaveRoom";
import {restartGame} from "store/reducers/gameReducer/actions/restartGame";

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
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);


  const {roomId} = useParams();

  const {winnerSymbol, winnerIndexes} = calculateWinner(boardState);

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
    dispatch(restartGame())
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
        <Button variant={'text'} color={'secondary'}>Leave room</Button>
      </Box>

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

         {winner.userId && (
           <Box sx={{mt: '30px'}}>
             <Button
               variant={'contained'}
               color={'error'}
               onClick={handleReloadGame}
             >
               TRY AGAIN
             </Button>
           </Box>
         )}

       </Box>

      </Box>

      <AcceptModal
        title={`The winner is ${winner.username} !!!`}
        isOpen={false}
        acceptCallback={handleReloadGame}
        closeCallback={handleLeaveRoom}
        acceptButtonTitle={'Try again'}
        isAccepted={isAccepted}
        error={error}
        isLoading={isLoading}
      />



    </Container>
  );
};
