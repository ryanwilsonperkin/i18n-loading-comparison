import React, {createContext, useContext, useCallback} from 'react';
import {useCookies} from 'react-cookie';

export const SPEEDS = ['slow', 'average', 'fast'];
export const SpeedContext = createContext({speed: 'average', setSpeed: () => {}});

export function SpeedProvider({children}) {
  const [cookies, setCookie] = useCookies(['speed']);
  const speed = cookies.speed ?? 'average';
  const setSpeed = useCallback((newSpeed) => {
    setCookie('speed', newSpeed);
    window.location.reload();
  }, [setCookie]);
  return <SpeedContext.Provider value={{speed, setSpeed}}>{children}</SpeedContext.Provider>;
}

export function useSpeed() {
  return useContext(SpeedContext);
}
