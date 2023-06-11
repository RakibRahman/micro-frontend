import useCountStore from "../../store";

const Button = () => {
  const { count, increase } = useCountStore();
  return (
    <div>
      <button className="btn" onClick={increase}>
        click me: {count}
      </button>
    </div>
  );
};

export default Button;
