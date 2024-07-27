"use client";

import { SessionProvider } from "next-auth/react";
import {store} from "@/src/redux/store";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import {ThemeProvider} from '@mui/material/styles';
import {createTheme} from '@mui/material';
import theme from '../src/styles/theme/theme';
import {useState} from "react";


const persistor = persistStore(store);

export const Providers = (props) => {
  const { options, children } = props;
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });
  return <SessionProvider >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={cache}>
          <ThemeProvider theme={createTheme(theme)}>
          {children}
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  </SessionProvider>;
};
