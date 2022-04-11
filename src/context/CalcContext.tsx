/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-eval */
import { createContext, ReactNode, useState } from "react";

type CalcContextType = {
  changeViewfinder: (str: string) => void;
  viewfinder: string;
  darkMode: boolean;
  result: string;
};

type CalcContextProviderProps = {
  children: ReactNode;
};

export const CalcContext = createContext({} as CalcContextType);

export function CalcContextProvider(props: CalcContextProviderProps) {
  const [viewfinder, setViewfinder] = useState("");
  const [result, setResult] = useState("0");
  const [reset, setReset] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  function changeViewfinder(str: string) {
    let calcExpression;

    switch (str) {
      case "darkMode":
        setDarkMode(!darkMode);
        break;

      case "←":
      case "backspace":
        if (result.length === 1) {
          setResult("0");
          setReset(false);
          
          if (viewfinder.length > 0 && result === '0') {
            setViewfinder(viewfinder.slice(0, -1));
          }
          return;
        }  

        setResult(result.slice(0, -1));
        break;

      case "del":
      case "C":
        setViewfinder("");
        setResult("0");
        setReset(false);

        break;

      case "/":
      case "+":
      case "-":
      case "*":
      case "×":
        if (result === '0') return;

        if (viewfinder.includes("=")) {
          setViewfinder(result + str.replaceAll("*", "×"));
          setResult("0");
          return;
        }

        calcExpression = eval(viewfinder.replaceAll('×', '*').replaceAll(',', '.') + result.replaceAll('×', '*').replaceAll(',', '.'));
        
        calcExpression % 1 ? calcExpression = calcExpression.toFixed(1) : null;

        calcExpression = calcExpression.toString().replaceAll('.', ',');

        setViewfinder(calcExpression + str.replaceAll("*", "×"));
        setResult(result);
        setReset(true);

        break;

      case ".":
      case ",":
        if (result.includes(',')) return;

        setResult(result + ',');
        break;

      case "=":
      case "enter":
        if (viewfinder.includes("=")) return;

        calcExpression = eval(viewfinder.replaceAll('×', '*').replaceAll(',', '.') + result.replaceAll('×', '*').replaceAll(',', '.'));

        calcExpression % 1 ? calcExpression = calcExpression.toFixed(1) : null;

        calcExpression === Infinity ? calcExpression = 'Não é possível dividir por zero' : null;
        
        calcExpression = calcExpression.toString().replaceAll('.', ',');

        setViewfinder(viewfinder + result + "=");
        setResult(calcExpression);
        break;

      default:
        if (result === "0") {
          setResult(str);
          return;
        }

        if (reset) {
          setResult(str);
          setReset(false);
          return;
        }

        if (viewfinder.includes("=")) {
          setViewfinder("");
          setResult(str);
          return;
        }

        setResult(result + str);
        break;
    }
  }

  return (
    <CalcContext.Provider
      value={{ 
        changeViewfinder, 
        viewfinder, 
        darkMode, 
        result
      }}
    >
      {props.children}
    </CalcContext.Provider>
  );
}
