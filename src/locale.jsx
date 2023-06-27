import React, {createContext, useContext, useCallback} from 'react';
import {useCookies} from 'react-cookie';

export const LOCALES = ['en', 'fr'];
export const LocaleContext = createContext({locale: 'en', setLocale: () => {}});

export function LocaleProvider({children}) {
  const [cookies, setCookie] = useCookies(['locale']);
  const locale = cookies.locale ?? 'en';
  const setLocale = useCallback((newLocale) => {
    setCookie('locale', newLocale);
    const url = new URL(window.location.href);
    url.port = 8080;
    window.location = url;
  }, [setCookie]);
  return <LocaleContext.Provider value={{locale, setLocale}}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
