import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Pagination from "./Pagination";
import Button from "./components/Button/Button";
import useCountStore from "./store";
function App() {
  const { count, increase } = useCountStore();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Pagination />
        <h1>Remote App!</h1>
        <Button />
      </div>
      <div className="card">
        <button onClick={increase}>count is {count}</button>
      </div>
    </QueryClientProvider>
  );
}

export default App;
