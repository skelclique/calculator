/* eslint-disable no-eval */
import { createContext, ReactNode, useState } from "react";

type CalcContextType = {
  viewfinder: string;
  result: string;
  changeViewfinder: (str: string) => void;
  darkMode: boolean;
};

type CalcContextProviderProps = {
  children: ReactNode;
};

export const CalcContext = createContext({} as CalcContextType);

export function CalcContextProvider(props: CalcContextProviderProps) {
  const [viewfinder, setViewfinder] = useState("");
  const [result, setResult] = useState("0");
  const [mathExpression, setMathExpression] = useState("0");
  const [darkMode, setDarkMode] = useState(false);

  function changeViewfinder(str: string) {
    let isFirst = mathExpression === "0";
    
    let lastChar = result === '0' ? result : mathExpression.charAt(mathExpression.length - 1);
    let isNumber = !isNaN(Number(lastChar));

    switch (str) {
      case "darkMode":
        setDarkMode(!darkMode);
        break;

      case "←":
      case "backspace":
        setResult(result.slice(0, -1));
        setMathExpression(mathExpression.slice(0, -1));
        break;

      case "del":
      case "C":
        setViewfinder("");
        setResult("0");
        setMathExpression("0");
        break;

      case "/":
      case "+":
      case "-":
      case "*":
      case "×":
        if (!isNumber || isFirst) {
          return;
        }

        if (viewfinder.includes("=")) {
          setViewfinder(result + str.replace("*", "×"));
          setResult("0");
          setMathExpression(mathExpression + str.replace("×", "*"));
          return;
        }

        setViewfinder(viewfinder + result + str.replace("*", "×"));
        setResult("0");
        setMathExpression(mathExpression + str.replace("×", "*"));
        break;

      case ".":
      case ",":
        if (!isNumber || result.includes(',')) {
          return;
        }

        if (viewfinder.includes("=")) {
          return;
        }

        setResult(result + ",");
        setMathExpression(mathExpression + ".");

        break;

      case "=":
      case "enter":
        if (!isNumber || isFirst) {
          return;
        }
        
        setViewfinder(mathExpression.replaceAll("*", "×").replaceAll('.', ',') + str.replace('enter', '='));
        setResult(eval(mathExpression).toString().replaceAll(".", ","));
        setMathExpression(eval(mathExpression).toString());
        break;

      case "0":
        if (isFirst) {
          return;
        }

        if (viewfinder.includes("=")) {
          setViewfinder('');
          setResult(str);
          setMathExpression(str);
          return;
        }

        setResult(result + str);
        setMathExpression(mathExpression + str);
        break;

      default:
        if (isFirst) {
          setResult(str);
          setMathExpression(str);
          return;
        }

        if (result === "0") {
          setResult(str);
          setMathExpression(mathExpression + str);
          return;
        }

        if (viewfinder.includes("=")) {
          setViewfinder('');
          setResult(str);
          setMathExpression(str);
          return;
        }

        setResult(result + str);
        setMathExpression(mathExpression + str);
        break;
    }
  }

  return (
    <CalcContext.Provider
      value={{ viewfinder, changeViewfinder, darkMode, result }}
    >
      {props.children}
    </CalcContext.Provider>
  );
}
