import { CircularProgress } from '@mui/material';
import { CardProps } from './interface';
import { sha256 } from 'js-sha256';

export default function Card(props: CardProps) {
  const { user, usersRealtime, isEveryoneSubmittedValue } = props;

  return (
    <div
      className='flex gap-2 flex-col p-5 w-72 h-72 items-center justify-between bg-zinc-900 rounded-3xl'
      key={user}
    >
      <p className='font-bold'>{user}</p>
      <div className='w-full h-full px-5 flex flex-col items-center justify-center gap-2'>
        {usersRealtime[user] && usersRealtime[user].commitment ? (
          <div className='flex flex-col items-center'>
            <p className='font-light'>Commitment:</p>
            <p className='break-all'>{usersRealtime[user].commitment}</p>
          </div>
        ) : (
          <CircularProgress />
        )}
        {usersRealtime[user] && isEveryoneSubmittedValue && (
          <div className='flex flex-col items-center'>
            <p className='font-light'>Value:</p>
            <p className='break-all'>{usersRealtime[user].value}</p>
          </div>
        )}
        {usersRealtime[user] && isEveryoneSubmittedValue && (
          <div className='flex flex-col items-center'>
            <p className='font-light'>Commitment verified:</p>
            <p>
              {sha256(
                `${usersRealtime[user].value}${usersRealtime[user].randomValue}`
              ) === usersRealtime[user].commitment
                ? '✅'
                : '❌'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
