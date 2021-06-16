import { FC, PropsWithChildren, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useUser } from '../../hooks/useUser';
import { refreshToken } from '../../services/user/user';

type ProtectedRouteProps = {
  path: string | string[];
  exact?: boolean;
};

export const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const { tokenUpdateDate, isTokenUpdated, hasToken } = useUser();

  useEffect(() => {
    if (!isTokenUpdated && hasToken) {
      dispatch(refreshToken());
    }
  }, []);

  if (hasToken && !isTokenUpdated) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasToken && tokenUpdateDate ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
