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
  const [mathExpression, setMathExpression] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  function changeViewfinder(str: string) {
    switch (str) {
      case "darkMode":
        setDarkMode(!darkMode);
        break;

      case "←":
      case "backspace":
        if (result.length === 1) {
          setResult("0");

          if (viewfinder.length > 0 && result === '0') {
            setViewfinder(viewfinder.slice(0, -1));
            setMathExpression(mathExpression.slice(0, -1));
          }
          return;
        }  

        setResult(result.slice(0, -1));
        break;

      case "del":
      case "C":
        setViewfinder("");
        setMathExpression("");
        setResult("0");

        break;

      case "/":
      case "+":
      case "-":
      case "*":
      case "×":
        if (viewfinder.includes("=")) {
          setViewfinder(result + str.replaceAll("*", "×"));
          setMathExpression(result + str.replaceAll("×", "*"));
          setResult("0");
          return;
        }

        setMathExpression(mathExpression + result.replaceAll(',', '.') + str.replaceAll("×", "*"));
        setViewfinder(viewfinder + result.replaceAll('.', ',') + str.replaceAll("*", "×"));
        setResult("0");

        break;

      case ".":
      case ",":
        if (result.includes(',')) return;

        setResult(result + ',');
        break;

      case "=":
      case "enter":
        if (viewfinder.includes("=")) return;

        setMathExpression(eval(mathExpression + result));
        setViewfinder(viewfinder + result + "=");
        setResult(eval(mathExpression + result.replaceAll(',', '.')).replaceAll(',', '.'));

        if (eval(mathExpression + result) === Infinity) {
          setResult("Impossível dividir por zero");
        }
        break;

      default:
        if (result === "0") {
          setResult(str);
          return;
        }

        if (viewfinder.includes("=")) {
          setViewfinder("");
          setMathExpression("");
          setResult(str);
          return;
        }

        setResult(result + str);
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
