import { get, ref, set } from 'firebase/database';
import { realtimeDb } from 'store';

export const joinToGameRealtime = async (nickname: string) => {
  try {
    const gameRef = ref(realtimeDb, 'game/' + nickname);

    await set(gameRef, {
      commitment: '',
      value: 0,
      randomValue: 0,
    });
  } catch (e) {
    throw e;
  }
};

export const leaveGameRealtime = async (nickname: string) => {
  try {
    const gameRef = ref(realtimeDb, 'game/' + nickname);

    await set(gameRef, null);
  } catch (e) {
    throw e;
  }
};

export const submitCommitment = async (
  nickname: string,
  commitment: string
) => {
  try {
    const gameRef = ref(realtimeDb, 'game/' + nickname);

    await set(gameRef, {
      commitment,
      value: 0,
      randomValue: 0,
    });
  } catch (e) {
    throw e;
  }
};

export const submitValue = async (
  nickname: string,
  value: number,
  randomValue: number
) => {
  try {
    const gameRef = ref(realtimeDb, 'game/' + nickname);

    const user = await get(gameRef);
    const commitment = user.val().commitment;

    await set(gameRef, {
      commitment,
      value,
      randomValue,
    });
  } catch (e) {
    throw e;
  }
};
