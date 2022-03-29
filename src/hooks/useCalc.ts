import { useContext } from 'react';
import { CalcContext } from '../context/CalcContext';

export function useCalc() {
  const value = useContext(CalcContext);

  return value;
}