import { useState } from "react";

export default function useVisualMode(initialMode) {
  // const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]); 

  function transition(newState, replace = false){
    if (!replace){
      setHistory( prev => { return [...prev, newState]})
    } else {
      setHistory( prev => { return [...prev.slice(0,prev.length-1), newState]})
    };
  }

  function back(){
    if(history.length < 2){
    return;
    }
    setHistory( prev => { return [...prev.slice(0,prev.length-1)]})
  } return {mode: history[history.length-1], transition, back}; 
};