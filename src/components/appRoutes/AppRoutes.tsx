import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Login} from "pages/Login";
import {useAppSelector} from "hooks/useAppSelector";
import {selectIsActive} from "store/selectors";
import {App} from "App";
import {ProtectedRoute} from "components/protectedRoute/ProtectedRoute";
import {Game} from "pages/Game";

export const AppRoutes = () => {
  const isActive = useAppSelector(selectIsActive);

  return (
    <Routes>
      <Route path={'/'} element={ <ProtectedRoute children={<App />} />}/>
      <Route path={'/login'} element={<Login />}/>
      <Route path={'/room/:roomId'} element={<ProtectedRoute children={<Game />} />}/>
      <Route path={'*'} element={<div>Not found</div>} />
    </Routes>
  );
};
