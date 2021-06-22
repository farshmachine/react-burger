import { FC, PropsWithChildren, useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useUser } from '../../hooks/useUser';
import { refreshToken, resetState } from '../../services/user/user';
import { resetTokens } from '../../utils/reset-tokens';

type ProtectedRouteProps = {
  path: string | string[];
  exact?: boolean;
};

export const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
  ...rest
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { tokenUpdateDate, isTokenUpdated, hasToken } = useUser();

  useEffect(() => {
    if (!isTokenUpdated && hasToken) {
      dispatch(refreshToken()).then(async ({ success }) => {
        if (!success) {
          await dispatch(resetState());
          resetTokens();
          history.push('/login');
        }
      });
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
