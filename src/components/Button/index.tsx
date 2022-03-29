import { ButtonHTMLAttributes } from "react";
import { FiDelete, FiMenu, FiMinus, FiPlus, FiX } from "react-icons/fi";
import { useCalc } from "../../hooks/useCalc";

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
};

export function Button({
  children,
  ...props 
}: ButtonProps) {
  const {  changeViewfinder } = useCalc();

  return (
    <button 
      className={ children === '0' ? 'button btn-zero' : 'button' }
      onClick={(e) => children !== 'menu' ? changeViewfinder(children) : null}
      {...props}
    >
      {
        children === '←' ? <FiDelete /> : null ||
        children === '×' ? <FiX /> : null ||
        children === '-' ? <FiMinus /> : null ||
        children === '+' ? <FiPlus /> : null ||
        children === 'menu' ? <FiMenu /> : children 
      }
      
    </button>
  );
}