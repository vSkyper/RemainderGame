import { useEffect } from 'react';
import {
  joinToGameFirestore,
  joinToGameRealtime,
  leaveGameFirestore,
  leaveGameRealtime,
} from 'store';
import { IUseJoinToGame } from './interfaces';

const UseJoinToGame = (data: IUseJoinToGame) => {
  const { currentUser } = data;

  return useEffect(() => {
    if (!currentUser) return;

    joinToGameFirestore(currentUser);
    joinToGameRealtime(currentUser);

    return () => {
      leaveGameFirestore(currentUser);
      leaveGameRealtime(currentUser);
    };
  }, [currentUser]);
};

export default UseJoinToGame;
