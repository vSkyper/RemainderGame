import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { User } from 'interfaces/interfaces';
import { firesoreDb } from 'store';

export const checkIfUserExists = async (nickname: string) => {
  try {
    const roomRef = doc(firesoreDb, 'game', 'room');

    const roomSnapshot = await getDoc(roomRef);

    if (!roomSnapshot.exists()) return false;

    const users: User[] = roomSnapshot.data().users;

    if (!users) return false;

    return users.some((user: User) => user.nickname === nickname);
  } catch (e) {
    throw e;
  }
};

export const joinToRoom = async (nickname: string) => {
  try {
    const roomRef = doc(firesoreDb, 'game', 'room');

    await updateDoc(roomRef, {
      users: arrayUnion({
        nickname,
        commitment: '',
        randomValue: 0,
        value: 0,
      }),
    });
  } catch (e) {
    throw e;
  }
};

export const submitCommitment = async (
  nickname: string,
  commitment: string
) => {
  try {
    const roomRef = doc(firesoreDb, 'game', 'room');

    await updateDoc(roomRef, {
      users: arrayRemove({
        nickname,
        commitment: '',
        randomValue: 0,
        value: 0,
      }),
    });

    await updateDoc(roomRef, {
      users: arrayUnion({
        nickname,
        commitment,
        randomValue: 0,
        value: 0,
      }),
    });
  } catch (e) {
    throw e;
  }
};
