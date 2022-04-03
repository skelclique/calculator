import KeyboardEventHandler from "react-keyboard-event-handler";
import { useEffect } from "react";

import { useCalc } from "../../hooks/useCalc";
import { Button } from "../../components/Button";

import "./styles.scss";

export function Landing() {
  const { viewfinder, changeViewfinder, darkMode } = useCalc();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.setProperty('--primary-color', '#fff');
      document.documentElement.style.setProperty('--secondary-color', '#8258fd');
      document.querySelector('meta[name=theme-color]')?.setAttribute('content', '#8258fd');
      
    } else {
      document.documentElement.style.setProperty('--primary-color', '#8258fd');
      document.documentElement.style.setProperty('--secondary-color', '#fff');
      document.querySelector('meta[name=theme-color]')?.setAttribute('content', '#fff');
    }
  }, [darkMode]);

  const keys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'backspace', '-', '+', '*', '/', 'enter', '.', 'del'
  ]

  return (
    <>
      <KeyboardEventHandler
        handleKeys={keys}
        onKeyEvent={(key) => changeViewfinder(key)}
      />

      <div className="container">
        <div className="viewfinder"> {viewfinder || "0"} </div>
        <Button>darkMode</Button>
        <Button>/</Button>
        <Button>C</Button>
        <Button>←</Button>
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <Button>×</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button>+</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>-</Button>
        <Button>0</Button>
        <Button>,</Button>
        <Button>=</Button>
      </div>
    </>
  );
}
