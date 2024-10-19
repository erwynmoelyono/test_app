"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { NextUIProvider } from "@nextui-org/react";

type Props = {
  children?: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <NextUIProvider> {children}</NextUIProvider>
    </Provider>
  );
}
