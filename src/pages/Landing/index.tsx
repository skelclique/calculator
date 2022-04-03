import KeyboardEventHandler from "react-keyboard-event-handler";

import { useCalc } from "../../hooks/useCalc";
import { Button } from "../../components/Button";

import "./styles.scss";

export function Landing() {
  const { viewfinder, changeViewfinder } = useCalc();
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
