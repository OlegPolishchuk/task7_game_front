import React, {FC, useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {User} from "store/reducers/appReducer/types/types";
import {useNavigate} from "react-router-dom";

type Props = {
  competitor: User;
  redirectUrl?: string;
  TIME_TO_REDIRECT: number,
  TIMER_STEP: number,
  callback?: () => void,
}


export const RedirectHint: FC<Props> = (
  {redirectUrl,
    competitor,
    TIME_TO_REDIRECT,
    TIMER_STEP,
    callback
  }) => {
  const navigate = useNavigate();

  const [timeToRedirect, setTimeTORedirect] = useState(TIME_TO_REDIRECT);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTimeTORedirect(timeToRedirect - TIMER_STEP);
    }, TIMER_STEP);

    if (timeToRedirect / TIMER_STEP === -1) {
      clearInterval(intervalID);

      callback && callback();
      redirectUrl && navigate(redirectUrl);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [timeToRedirect, navigate]);

  return (
    <Typography variant={'h6'} color={'error.main'} textAlign={'center'}>
      <Typography variant={'h5'} component={'span'} color={'text.primary'} mr={'10px'}>
        {competitor.username}
      </Typography>
      has left the game. You will be redirected in {timeToRedirect / TIMER_STEP} s
    </Typography>
  );
};
