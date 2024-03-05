import React, { ReactNode } from 'react';

export interface AppProviderProps {
  children: ReactNode;
}

export interface IAppContext {
  currentUser: string | null | undefined;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
}
