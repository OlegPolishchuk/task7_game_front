import React, {FC} from 'react';
import {Box} from "@mui/material";
import {GameSquare} from "components/gameSquare/GameSquare";

type Props = {
  board: string[];
  squareClickCallback: (index: number) => void;
  isMyTurn: boolean;
  wonIndexes: number[];
}

export const BoardGame: FC<Props> = (
  {
    board,
    squareClickCallback,
    isMyTurn,
    wonIndexes
  }) => {

  return (
    <Box sx={{
      width: '300px',
      height: '300px',
      background: 'rgba(224, 224, 224)',
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      {
        board.map((square,index) => {
          let color = '';

          if (wonIndexes) {
            if (wonIndexes.includes(index)) {
              color = 'rgba(250, 75, 78, 0.9)';
            }
          }

          return (
            <GameSquare
              key={index}
              value={square}
              index={index}
              isMyTurn={isMyTurn}
              clickCallback={squareClickCallback}
              color={color}
            />
          )
        })
      }
    </Box>
  );
};
