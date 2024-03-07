import { Users } from 'interfaces/interfaces';

export interface IUseOnPageDestroy {
  currentUser?: string | null;
}

export interface ISubscribeGameRoom {
  setUsersFirestore: React.Dispatch<React.SetStateAction<string[]>>;
  currentUser?: string | null;
  setUsersRealtime: React.Dispatch<React.SetStateAction<Users>>;
  setIsEveryoneSubmittedCommitment: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsEveryoneSubmittedValue: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawnPlayer: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface IUseJoinToGame {
  currentUser?: string | null;
}
