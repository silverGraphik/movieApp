import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState, authState } from '../atom/authAtom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useRecoilValue(authState);
  const user = useRecoilValue(userState);

  if (auth === true && user !== null) {
    return (
      <Route {...rest} render={(props) => <Component {...props} />}></Route>
    );
  } else return <Redirect push to='/auth' />;
};

export default PrivateRoute;
