import { TextField } from '@mui/material';
import { CssVarsProvider } from '@mui/material-next';
import { Button } from '@mui/material-next';
import { useAppContext } from 'providers';
import { useCallback, useRef, useState } from 'react';
import { checkIfUserExists } from 'store';

export default function SignIn() {
  const formRef = useRef<HTMLFormElement>(null);
  const [nickname, setNickname] = useState<string>('');
  const [isUserExists, setIsUserExists] = useState<boolean>(false);
  const { setCurrentUser } = useAppContext();

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleJoin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        if (!formRef.current || !formRef.current.reportValidity()) return;
        setIsUserExists(false);

        const trimmedNickname = nickname.trim();

        const userExists = await checkIfUserExists(trimmedNickname);
        if (userExists) {
          setIsUserExists(true);
          return;
        }

        setCurrentUser(trimmedNickname);
      } catch (e) {
        throw e;
      }
    },
    [nickname, setCurrentUser]
  );

  return (
    <form
      ref={formRef}
      className='flex flex-col gap-6 items-center justify-center w-full h-full'
      onSubmit={handleJoin}
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
        <Button variant='filled' type='submit'>
          Join game
        </Button>
      </CssVarsProvider>
    </form>
  );
}
