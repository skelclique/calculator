import { CalcContextProvider } from "./context/CalcContext";

import { Landing } from "./pages/Landing";

function App() {
  return (
    <CalcContextProvider>
      <Landing /> 
    </CalcContextProvider>
  );
}

export default App;
