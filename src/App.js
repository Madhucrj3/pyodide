import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const runScript = async (b, c) => {
    const pyodide = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
    });
    window.customInputs = {
      name: "Alice",
      age: 30,
      city: "New York",
    };
    const overallCode =
      '{"code_content":"\\"name = input(\'Enter your name: \')\\\\nage = input(\'Enter your age: \')\\\\ncity = input(\'Enter your city: \')\\\\nprint(\'Name: \' + name)\\\\nprint(\'Age: \' + age)\\\\nprint(\'City: \' + city)\\\\n  \\"","code_language":"PYTHON39","inputs":["\\"ram\\\\n45\\\\nshayam\\""]}';

    const overallParseCode = JSON.parse(overallCode);
    const code_content = JSON.parse(overallParseCode.code_content);
    const code_input = JSON.parse(overallParseCode.inputs);
    const customInputFunction = () => {
      return window.customInputs.name;
    };
    const result = await pyodide.runPython(code_content, {
      input: customInputFunction,
    });
    console.log(result);
    return result;
  };
  const [output, setOutput] = useState("(loading...)");

  useEffect(() => {
    const run = async () => {
      const out = await runScript(5, 7);
      setOutput(out);
    };
    run();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>5 + 7 = {output}</p>
      </header>
    </div>
  );
};

export default App;
