import React,{useContext, useEffect, useState} from 'react';
import './App.css';
import { SetString } from './components/SetString';
import { DrizzleContext } from "@drizzle/react-plugin";
import ipfs from "./ipfs"
import { ReadString } from './components/ReadString';
import { TokenOf } from './components/TokenOf';
import {Context} from "./index";
import Bar from './components/Bar';

function App() {
  const val = useContext(Context);
  console.log("val: ",val);
  const spare = useState();
  const [stackId,setStackId] = useState();
  const drizzleData = useContext(DrizzleContext.Context);
  console.log("drizzleData",drizzleData);
   useEffect(()=> {
  },[])


  if(!drizzleData.initialized) return "Drizzle loading...";
  console.log(drizzleData.initialized);
  return (
    <div className="App">
      <Bar/>
      <SetString/>
      <ReadString/>
    </div>
  );
}
export default App;
