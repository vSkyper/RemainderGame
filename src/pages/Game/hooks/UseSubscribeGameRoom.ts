import { useCallback, useEffect } from 'react';
import { ISubscribeGameRoom } from './interfaces';
import { firesoreDb, realtimeDb } from 'store';
import { onValue, ref } from 'firebase/database';
import { Users } from 'interfaces/interfaces';
import { doc, onSnapshot } from 'firebase/firestore';

const UseSubscribeGameRoom = (data: ISubscribeGameRoom) => {
  const {
    setUsersFirestore,
    currentUser,
    setUsersRealtime,
    setIsEveryoneSubmittedCommitment,
    setIsEveryoneSubmittedValue,
    setDrawnPlayer,
  } = data;

  const checkIsEveryoneSubmittedCommitment = useCallback((users: Users) => {
    if (Object.keys(users).length === 0) return false;

    const isEveryoneSubmittedCommitment = Object.values(users).every(
      (user) => user.commitment
    );

    return isEveryoneSubmittedCommitment;
  }, []);

  const checkIsEveryoneSubbmitedValue = useCallback((users: Users) => {
    if (Object.keys(users).length === 0) return false;

    const isEveryoneSubmittedValue = Object.values(users).every(
      (user) => user.value
    );

    return isEveryoneSubmittedValue;
  }, []);

  return useEffect(() => {
    if (!currentUser) return;

    const roomRef = doc(firesoreDb, 'game', 'room');
    const unsubscribeFirestore = onSnapshot(roomRef, (roomSnapshot) => {
      if (!roomSnapshot.exists()) return;

      const users: string[] = roomSnapshot.data().users;

      if (!users) return;

      setUsersFirestore(users);
      setDrawnPlayer(undefined);
    });

    const gameRef = ref(realtimeDb, 'game/');
    const unsubsribeRealtime = onValue(gameRef, (gameSnapshot) => {
      if (!gameSnapshot.exists()) return;

      const users: Users = gameSnapshot.val();

      if (!users) return;

      setUsersRealtime(users);

      const isEveryoneSubmittedCommitment =
        checkIsEveryoneSubmittedCommitment(users);

      setIsEveryoneSubmittedCommitment(isEveryoneSubmittedCommitment);

      const isEveryoneSubmittedValue = checkIsEveryoneSubbmitedValue(users);

      setIsEveryoneSubmittedValue(isEveryoneSubmittedValue);
    });

    return () => {
      unsubscribeFirestore();
      unsubsribeRealtime();
    };
  }, [
    checkIsEveryoneSubbmitedValue,
    checkIsEveryoneSubmittedCommitment,
    currentUser,
    setDrawnPlayer,
    setIsEveryoneSubmittedCommitment,
    setIsEveryoneSubmittedValue,
    setUsersFirestore,
    setUsersRealtime,
  ]);
};

export default UseSubscribeGameRoom;
