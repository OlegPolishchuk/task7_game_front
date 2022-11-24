import React, {FC, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "hooks";
import {selectIsActive} from "store/selectors";

type Props = {
  children: React.ReactNode;
}

export const ProtectedRoute = ({children}: Props) => {
  const navigate = useNavigate();
  const isActive = useAppSelector(selectIsActive);

  useEffect(() => {
    if (!isActive) {
      navigate('/login')
    }
  }, [isActive])

  return (
    <>
      {children}
    </>
  )
};
