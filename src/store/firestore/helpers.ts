import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { firesoreDb } from 'store';

export const checkIfUserExists = async (nickname: string) => {
  try {
    const roomRef = doc(firesoreDb, 'game', 'room');

    const roomSnapshot = await getDoc(roomRef);

    if (!roomSnapshot.exists()) return false;

    const users: string[] = roomSnapshot.data().users;

    if (!users) return false;

    return users.includes(nickname);
  } catch (e) {
    throw e;
  }
};

export const joinToGameFirestore = async (nickname: string) => {
  try {
    const roomRef = doc(firesoreDb, 'game', 'room');

    await updateDoc(roomRef, {
      users: arrayUnion(nickname),
    });
  } catch (e) {
    throw e;
  }
};

export const leaveGameFirestore = async (nickname: string) => {
  try {
    const roomRef = doc(firesoreDb, 'game', 'room');

    await updateDoc(roomRef, {
      users: arrayRemove(nickname),
    });
  } catch (e) {
    throw e;
  }
};
