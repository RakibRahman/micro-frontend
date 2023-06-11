import Button from "remote_app/Button";
import useCountStore from "remote_app/store";
import "./App.css";

function App() {
  const { count, increase } = useCountStore();

  return (
    <>
      <div>
        <h1>Host App</h1>
        <Button />
      </div>
      <div className="card">
        <button onClick={increase}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
