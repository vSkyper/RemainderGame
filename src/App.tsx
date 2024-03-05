import { createTheme, ThemeProvider } from '@mui/material';
import { Game, SignIn } from 'pages';
import { useAppContext } from 'providers';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const { currentUser } = useAppContext();

  return (
    <ThemeProvider theme={darkTheme}>
      {currentUser ? <Game /> : <SignIn />}
    </ThemeProvider>
  );
}
