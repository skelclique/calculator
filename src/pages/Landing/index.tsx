import KeyboardEventHandler from "react-keyboard-event-handler";
import { useEffect } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

import { useCalc } from "../../hooks/useCalc";
import { Button } from "../../components/Button";

import "./styles.scss";

export function Landing() {
  const { viewfinder, changeViewfinder, darkMode, changeTheme } = useCalc();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.setProperty('--primary-color', '#fff');
      document.documentElement.style.setProperty('--secondary-color', '#8258fd');
    } else {
      document.documentElement.style.setProperty('--primary-color', '#8258fd');
      document.documentElement.style.setProperty('--secondary-color', '#fff');
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

      { darkMode ? 
        <MdDarkMode onClick={changeTheme}/> : 
        <MdOutlineDarkMode onClick={changeTheme} /> 
      }     
      
      <div className="container">
        <div className="viewfinder"> {viewfinder || "0"} </div>
        <Button>menu</Button>
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
