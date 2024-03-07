import { useCallback, useEffect, useState } from 'react';
import { ProfileProps } from './interface';
import { joinToGameRealtime, submitCommitment, submitValue } from 'store';
import { sha256 } from 'js-sha256';
import { Button, CssVarsProvider } from '@mui/material-next';
import { IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Profile(props: ProfileProps) {
  const { currentUser, isEveryoneSubmittedCommitment } = props;

  const [value, setValue] = useState<number>(0);
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    if (!currentUser || !isEveryoneSubmittedCommitment) return;

    submitValue(currentUser, value, randomNumber);
  }, [currentUser, isEveryoneSubmittedCommitment, randomNumber, value]);

  const handleValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.valueAsNumber);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!currentUser) return;

      const randomNumber = Math.floor(Math.random() * 10 ** 10);
      setRandomNumber(randomNumber);

      const commitment = sha256(`${value}${randomNumber}`);

      submitCommitment(currentUser, commitment);
    },
    [currentUser, setRandomNumber, value]
  );

  const handleDelete = useCallback(() => {
    if (!currentUser) return;

    setRandomNumber(0);
    setValue(0);
    joinToGameRealtime(currentUser);
  }, [currentUser]);

  return (
    <div className='p-6'>
      <p className='font-bold text-lg pb-3'>
        Your nickname: <span className='font-normal'>{currentUser}</span>
      </p>
      {randomNumber ? (
        <div className='flex items-center gap-3'>
          <p className='font-bold text-lg'>
            Submitted value: <span className='font-normal'>{value}</span>
          </p>
          <IconButton color='error' onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      ) : (
        <form className='flex items-center gap-5' onSubmit={handleSubmit}>
          <TextField
            label='Number'
            value={value}
            onChange={handleValueChange}
            type='number'
            variant='standard'
          />
          <CssVarsProvider>
            <Button variant='filledTonal' type='submit'>
              Submit
            </Button>
          </CssVarsProvider>
        </form>
      )}
    </div>
  );
}
