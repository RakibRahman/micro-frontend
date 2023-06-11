import "./App.css";
import Button from "./components/Button/Button";
import useCountStore from "./store";

function App() {
  const { count, increase } = useCountStore();

  return (
    <>
      <div>
        <h1>Remote App!!!</h1>
        <Button />
      </div>
      <div className="card">
        <button onClick={increase}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
