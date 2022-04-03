import { ButtonHTMLAttributes } from "react";
import { FiDelete, FiMinus, FiPlus, FiX } from "react-icons/fi";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

import { useCalc } from "../../hooks/useCalc";

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
};

export function Button({
  children,
  ...props 
}: ButtonProps) {
  const {  changeViewfinder, darkMode } = useCalc();

  return (
    <button 
      className={ children === '0' ? 'button btn-zero' : 'button' }
      onClick={(e) => changeViewfinder(children) }
      {...props}
    >
      {
        children === '←' ? <FiDelete /> : null ||
        children === '×' ? <FiX /> : null ||
        children === '-' ? <FiMinus /> : null ||
        children === '+' ? <FiPlus /> : null ||
        children === 'darkMode' ? (
          darkMode ? <MdDarkMode /> : <MdOutlineDarkMode  /> 
        ) : children 
      }
      
    </button>
  );
}