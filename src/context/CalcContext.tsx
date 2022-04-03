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
    let isFirst = mathExpression.length === 0;

    let lastChar = mathExpression.charAt(mathExpression.length - 1);
    let isNumber = isNaN(Number(lastChar));
    
    switch (str) {
      case 'menu':
          
        break;

      case '←':
      case 'backspace':
          setViewfinder(viewfinder.slice(0, -1));
          setMathExpression(mathExpression.slice(0, -1));
        break;

      case 'del':
      case 'C':
          setViewfinder('');
          setMathExpression('');
        break;

      case '/':
      case '+':
      case '-':
          if (isNumber || isFirst) {
            return;
          }

          setViewfinder(viewfinder + str);
          setMathExpression(mathExpression + str);
        break;

      case '.':
      case ',':
          if (isNumber || isFirst) {
            return;
          }

          setViewfinder(viewfinder + ',')
          setMathExpression(mathExpression + '.');
        break;
    
      case '=':
      case 'enter':
          if (isNumber || isFirst) {
            return;
          }

          setViewfinder(eval(mathExpression).toString());
          setMathExpression(eval(mathExpression).toString());
        break;

      case '*':
      case '×':
          if (isNumber || isFirst) {
            return;
          }

          setViewfinder(viewfinder + '×');
          setMathExpression(mathExpression + '*');
        break;

      case '0':
          if (isNumber || isFirst) {
            return;
          }

          setViewfinder(viewfinder + str);
          setMathExpression(mathExpression + str);
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
