"use client";
import { Provider } from "react-redux";
import { Children } from "@/app/types";
import { store }from "../store/store";

const AppStateProvider = ({children} : Children) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default AppStateProvider