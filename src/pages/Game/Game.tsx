import { Users } from 'interfaces/interfaces';
import { useAppContext } from 'providers';
import { useEffect, useState } from 'react';
import { UseJoinToGame, UseOnPageDestroy, UseSubscribeGameRoom } from './hooks';
import { Card, Navbar, Profile } from './components';

export default function Game() {
  const { currentUser } = useAppContext();
  const [usersFirestore, setUsersFirestore] = useState<string[]>([]);
  const [usersRealtime, setUsersRealtime] = useState<Users>({});
  const [isEveryoneSubmittedCommitment, setIsEveryoneSubmittedCommitment] =
    useState<boolean>(false);
  const [isEveryoneSubmittedValue, setIsEveryoneSubmittedValue] =
    useState<boolean>(false);
  const [drawnPlayer, setDrawnPlayer] = useState<string>();

  useEffect(() => {
    if (!isEveryoneSubmittedValue) return;

    let sum: number = 0;

    Object.values(usersRealtime).forEach((user) => {
      sum += user.value;
    });

    sum = sum % usersFirestore.length;

    const drawnPlayer = usersFirestore[sum];

    setDrawnPlayer(drawnPlayer);
  }, [isEveryoneSubmittedValue, usersFirestore, usersRealtime]);

  UseOnPageDestroy({ currentUser });
  UseJoinToGame({ currentUser });
  UseSubscribeGameRoom({
    currentUser,
    setUsersFirestore,
    setUsersRealtime,
    setIsEveryoneSubmittedCommitment,
    setIsEveryoneSubmittedValue,
    setDrawnPlayer,
  });

  return (
    <>
      <Navbar
        drawnPlayer={drawnPlayer}
        isEveryoneSubmittedCommitment={isEveryoneSubmittedCommitment}
        isEveryoneSubmittedValue={isEveryoneSubmittedValue}
      />
      <Profile
        currentUser={currentUser}
        isEveryoneSubmittedCommitment={isEveryoneSubmittedCommitment}
      />
      <div className='p-6 grid justify-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {usersFirestore.map((user: string) => {
          if (user === currentUser) return;
          return (
            <Card
              key={user}
              user={user}
              usersRealtime={usersRealtime}
              isEveryoneSubmittedValue={isEveryoneSubmittedValue}
            />
          );
        })}
      </div>
    </>
  );
}
