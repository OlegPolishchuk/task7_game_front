import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Login} from "pages/Login";
import {useAppSelector} from "hooks/useAppSelector";
import {selectIsActive} from "store/selectors";
import App from "App";

export const AppRoutes = () => {
  const isActive = useAppSelector(selectIsActive);

  return (
    <Routes>
      <Route path={'/'} element={ isActive ? <App /> : <Login />}/>
      <Route path={'/login'} element={<Login />}/>
      <Route path={'*'} element={<div>Not found</div>} />
    </Routes>
  );
};
