import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useAppSelector} from "hooks";
import {selectMySymbol, selectWinner} from "store/selectors";

type Props = {
  value: string;
  index: number;
  clickCallback: (index: number) => void;
  isMyTurn: boolean;
  color: string;
}

export const GameSquare: FC<Props> = (
  {
    value,
    clickCallback,
    index,
    isMyTurn,
    color
  }
) => {
  const winner = useAppSelector(selectWinner);
  const mySymbol = useAppSelector(selectMySymbol);
  console.log(`index=${index}, color=${color}`)

  const handleClick = () => {
    clickCallback(index)
  }

  return (
    <Button
      variant={'outlined'}
      disabled={!isMyTurn || !!winner.userId || value !== ''}
      sx={{
        width: '100px',
        height: '100px',
        background: '#fff',
        fontSize: '40px',
        color: color,
        '&:disabled': {
          color: color ? color: value === mySymbol ? 'rgba(0,0,0,.5)' : '',
          background: color ? 'rgb(255,233,233)' : '',
        }
      }}
      onClick={handleClick}
    >
      {value}
    </Button>
  );
};
