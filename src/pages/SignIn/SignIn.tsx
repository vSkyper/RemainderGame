import { TextField } from '@mui/material';
import { CssVarsProvider } from '@mui/material-next';
import { Button } from '@mui/material-next';
import { useAppContext } from 'providers';
import { useRef, useState } from 'react';
import { checkIfUserExists, joinToRoom } from 'store';

export default function SignIn() {
  const formRef = useRef<HTMLFormElement>(null);
  const [nickname, setNickname] = useState<string>('');
  const [isUserExists, setIsUserExists] = useState<boolean>(false);
  const { setCurrentUser } = useAppContext();

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleJoin = async () => {
    try {
      if (!formRef.current || !formRef.current.reportValidity()) return;
      setIsUserExists(false);

      const trimmedNickname = nickname.trim();

      const userExists = await checkIfUserExists(trimmedNickname);
      if (userExists) {
        setIsUserExists(true);
        return;
      }

      await joinToRoom(trimmedNickname);

      setCurrentUser(trimmedNickname);
    } catch (e) {
      throw e;
    }
  };

  return (
    <form
      ref={formRef}
      className='flex flex-col gap-6 items-center justify-center w-full h-full'
    >
      <p className='text-xl font-bold'>Sign in into game!</p>
      <TextField
        label='Nickname'
        onChange={handleNicknameChange}
        error={isUserExists}
        helperText={isUserExists ? 'User already exists' : ''}
        required
      />
      <CssVarsProvider>
        <Button variant='filled' onClick={handleJoin}>
          Join game
        </Button>
      </CssVarsProvider>
    </form>
  );
}
