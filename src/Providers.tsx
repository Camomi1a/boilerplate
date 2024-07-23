"use client";

import { SessionProvider } from "next-auth/react";
import {store} from "@/src/redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

const persistor = persistStore(store);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  </SessionProvider>;
};
