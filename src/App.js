import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const runScript = async (b,c) => {
  const pyodide = await window.loadPyodide({
    indexURL : "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
  });
  //await pyodide.loadPackage(['numpy']);
  const code = `
      def func(b,c):
          return b+c;
      func(${b},${c})
    `;
    
    const result = await pyodide.runPython(code);
    console.log(result);
    return result;
}

const App = () => {
  const [output, setOutput] = useState("(loading...)");

  useEffect(() => {
    const run = async () => {
      //const scriptText = await (await fetch(script)).text();
      const out = await runScript(5,7);
      setOutput(out);
    }
    run();

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          5 + 7 = {output}
        </p>
      </header>
    </div>
  );
}

export default App;
