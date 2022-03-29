/* eslint-disable no-eval */
import { createContext, ReactNode, useState } from "react";

type CalcContextType = {
  viewfinder: string;
  changeViewfinder: (str: string) => void;
};

type CalcContextProviderProps = {
  children: ReactNode;
};

export const CalcContext = createContext({} as CalcContextType);

export function CalcContextProvider(props: CalcContextProviderProps) {
  const [viewfinder, setViewfinder] = useState("");
  const [mathExpression, setMathExpression] = useState("");

  function changeViewfinder(str: string) {
    switch (str) {
      case '←':
      case 'backspace':
          setViewfinder(viewfinder.toString().slice(0, -1));
          setMathExpression(mathExpression.toString().slice(0, -1));
        break;

      case 'del':
      case 'C':
          setViewfinder('');
          setMathExpression('');
        break;

      case '.':
          setViewfinder(viewfinder + ',')
          setMathExpression(mathExpression + str);
        break;
    
      case '=':
      case 'enter':
          setViewfinder(eval(mathExpression));
          setMathExpression(eval(mathExpression));
        break;

      case '*':
      case '×':
          setViewfinder(viewfinder + '×');
          setMathExpression(mathExpression + '*');
        break;

      default:
          setViewfinder(viewfinder + str);
          setMathExpression(mathExpression + str);
        break;
    }
  }

  return (
    <CalcContext.Provider value={{ viewfinder, changeViewfinder }}>
      {props.children}
    </CalcContext.Provider>
  );
}
