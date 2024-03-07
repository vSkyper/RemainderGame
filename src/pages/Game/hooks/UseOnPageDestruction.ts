import { useCallback, useEffect } from 'react';
import { IUseOnPageDestroy } from './interfaces';
import { leaveGameFirestore, leaveGameRealtime } from 'store';

const UseOnPageDestroy = (data: IUseOnPageDestroy) => {
  const { currentUser } = data;

  const handleOnBeforeUnload = useCallback(
    async (e: BeforeUnloadEvent) => {
      e.returnValue = '';

      if (!currentUser) return;
      leaveGameFirestore(currentUser);
      leaveGameRealtime(currentUser);
    },
    [currentUser]
  );

  return useEffect(() => {
    window.addEventListener('beforeunload', handleOnBeforeUnload, {
      capture: true,
    });

    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload, {
        capture: true,
      });
    };
  }, [handleOnBeforeUnload, currentUser]);
};

export default UseOnPageDestroy;
