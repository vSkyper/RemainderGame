import { NavbarProps } from './interface';

export default function Navbar(props: NavbarProps) {
  const {
    isEveryoneSubmittedCommitment,
    isEveryoneSubmittedValue,
    drawnPlayer,
  } = props;

  return (
    <div className='p-6 flex justify-center font-bold bg-zinc-900 text-xl'>
      {!isEveryoneSubmittedCommitment && (
        <p>Waiting for everyone to submit commitment</p>
      )}
      {isEveryoneSubmittedCommitment && !drawnPlayer && (
        <p>Waiting for everyone to submit value</p>
      )}
      {isEveryoneSubmittedValue && drawnPlayer && (
        <p>{drawnPlayer} is the winner</p>
      )}
    </div>
  );
}
