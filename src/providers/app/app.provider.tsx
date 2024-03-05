import { createContext, useContext, useMemo, useState } from 'react';
import { AppProviderProps, IAppContext } from './app.types';

export const AppContext = createContext<IAppContext>(undefined!);
const { Provider } = AppContext;

export function AppProvider(props: AppProviderProps) {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<string | null>();

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser]
  );

  return <Provider value={value}>{children}</Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be uset within an AppProvider!');
  }
  return context;
};
