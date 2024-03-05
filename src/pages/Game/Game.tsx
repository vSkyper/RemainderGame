import { CircularProgress, TextField } from '@mui/material';
import { Button, CssVarsProvider } from '@mui/material-next';
import { doc, onSnapshot } from 'firebase/firestore';
import { User } from 'interfaces/interfaces';
import { sha256 } from 'js-sha256';
import { useAppContext } from 'providers';
import { useEffect, useState } from 'react';
import { firesoreDb, submitCommitment } from 'store';

export default function Game() {
  const { currentUser } = useAppContext();
  const [value, setValue] = useState<number>();
  const [randomNumber, setRandomNumber] = useState<number>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const roomRef = doc(firesoreDb, 'game', 'room');

    const unsubscribe = onSnapshot(roomRef, (roomSnapshot) => {
      if (!roomSnapshot.exists()) return;

      const users: User[] = roomSnapshot.data().users;

      if (!users) return;

      const filteredUsers = users.filter((user: User) => {
        return user.nickname !== currentUser;
      });

      setUsers(filteredUsers);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.valueAsNumber);
  };

  const handleSubmit = () => {
    if (!currentUser || !value) return;

    const randomNumber = Math.floor(Math.random() * 100000000000);
    setRandomNumber(randomNumber);

    const commitment = sha256(`${value}${randomNumber}`);

    submitCommitment(currentUser, commitment);
  };

  return (
    <div className='p-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
      <div className='flex gap-6 flex-col p-5 w-72 h-60 items-center justify-between bg-zinc-900 rounded-3xl'>
        <p className='font-bold'>{currentUser}</p>
        {randomNumber ? (
          <div className='w-full h-40 px-8 flex flex-col items-center justify-center'>
            <p className='break-all'>{value}</p>
          </div>
        ) : (
          <>
            <TextField
              label='Number'
              onChange={handleValueChange}
              type='number'
              variant='standard'
            />
            <CssVarsProvider>
              <Button variant='filled' onClick={handleSubmit}>
                Submit
              </Button>
            </CssVarsProvider>
          </>
        )}
      </div>
      {users.map((user: User) => (
        <div
          className='flex gap-6 flex-col p-5 w-72 h-60 items-center justify-between bg-zinc-900 rounded-3xl'
          key={user.nickname}
        >
          <p className='font-bold'>{user.nickname}</p>
          <div className='w-full h-40 px-8 flex flex-col items-center justify-center'>
            {user.commitment ? (
              <p className='break-all'>{user.commitment}</p>
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
