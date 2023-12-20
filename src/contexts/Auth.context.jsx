import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import useSWRMutation from 'swr/mutation';
import * as api from '../api';

const JWT_TOKEN_KEY = 'jwtToken';
const USER_ID_KEY = 'userID';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token));
    setReady(true);
  }, [token]);

  const {
    isMutating: loginLoading,
    error: loginError,
    trigger: doLogin,
  } = useSWRMutation('users/login', api.post);

  const {
    isMutating: registerLoading,
    error: registerError,
    trigger: doRegister,
  } = useSWRMutation('users/register', api.post);

  const setSession = useCallback(
    (token, user) => {
      setToken(token);
      setUser(user);

      localStorage.setItem(JWT_TOKEN_KEY, token);
      localStorage.setItem(USER_ID_KEY, user.id);
    },
    [],
  );

  const login = useCallback(
    async (email, password) => {
      try {
        const { token, user } = await doLogin({
          email,
          password,
        });

        setSession(token, user);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin, setSession],
  );

  const register = useCallback(
    async (data) => {
      try {
        const { token, user } = await doRegister(data);
        setSession(token, user);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }, []);

  const value = useMemo(
    () => ({
      token, // mag eruit, hoeft er eigenlijk niet in
      user,
      error: loginError || registerError,
      ready,
      loading: loginLoading || registerLoading,
      isAuthed,
      login,
      logout,
      register,
    }),
    [token, user, loginError, registerError, ready, loginLoading, registerLoading, isAuthed, login, logout, register],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};