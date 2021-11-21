import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MyNFT from "./contracts/MyNFT.json";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
 
 const options = {
  contracts: [MyNFT],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
}; 
// setup drizzle
export const Context = createContext();
export function ContextProvider({children}) {
  return (
    <Context.Provider value="initialState">
    {children}
  </Context.Provider>
  )
}
const drizzle = new Drizzle(options);
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
   <DrizzleContext.Provider drizzle={drizzle}>
    <App />
    </DrizzleContext.Provider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
