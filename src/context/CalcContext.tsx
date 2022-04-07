/* eslint-disable no-eval */
import { createContext, ReactNode, useState } from "react";

type CalcContextType = {
  viewfinder: string;
  changeViewfinder: (str: string) => void;
  darkMode: boolean;
};

type CalcContextProviderProps = {
  children: ReactNode;
};

export const CalcContext = createContext({} as CalcContextType);

export function CalcContextProvider(props: CalcContextProviderProps) {
  const [viewfinder, setViewfinder] = useState("0");
  const [mathExpression, setMathExpression] = useState("0");
  const [darkMode, setDarkMode] = useState(false);

  function changeViewfinder(str: string) {
    let isFirst = mathExpression === '0';

    let lastChar = mathExpression.charAt(mathExpression.length - 1);
    let isNumber = !isNaN(Number(lastChar));
    
    switch (str) {
      case 'darkMode':
         setDarkMode(!darkMode);
        break;

      case '←':
      case 'backspace':
          setViewfinder(viewfinder.slice(0, -1));
          setMathExpression(mathExpression.slice(0, -1));
        break;

      case 'del':
      case 'C':
          setViewfinder('0');
          setMathExpression('0');
        break;

      case '/':
      case '+':
      case '-':
          if (!isNumber || isFirst) {
            return;
          }

          setViewfinder(viewfinder + str);
          setMathExpression(mathExpression + str);
        break;

      case '.':
      case ',':
          if (!isNumber) {
            return;
          }

          setViewfinder(viewfinder + ',')
          setMathExpression(mathExpression + '.');
        break;
    
      case '=':
      case 'enter':
          if (!isNumber || isFirst) {
            return;
          }

          setViewfinder(eval(mathExpression).toString().replaceAll('.', ','));
          setMathExpression(eval(mathExpression).toString());
        break;

      case '*':
      case '×':
          if (!isNumber || isFirst) {
            return;
          }

          setViewfinder(viewfinder + '×');
          setMathExpression(mathExpression + '*');
        break;

      case '0':
          if (isFirst) {
            return;
          }

          setViewfinder(viewfinder + str);
          setMathExpression(mathExpression + str);
        break;

      default:
          if (isFirst) {
            setViewfinder(str);
            setMathExpression(str);
            return;
          }
          
          setViewfinder(viewfinder + str);
          setMathExpression(mathExpression + str);
        break;
    }

    // debug
    console.clear();
    console.log(`viewfinder: (${viewfinder})`);
    console.log(`mathexpression: (${mathExpression})`);
    console.log(`darkmode: ${darkMode}`);
  }

  return (
    <CalcContext.Provider value={{ viewfinder, changeViewfinder, darkMode }}>
      {props.children}
    </CalcContext.Provider>
  );
}
