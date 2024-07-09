"use client";

import { SessionProvider } from "next-auth/react";
import {store} from "@/src/redux/store";
import {Provider} from "react-redux";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider >
    <Provider store={store}>
      {children}
    </Provider>
  </SessionProvider>;
};
