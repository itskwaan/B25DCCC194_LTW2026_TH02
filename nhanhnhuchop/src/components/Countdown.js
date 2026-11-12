import { useState, useEffect } from 'react';

const Countdown = ({ onDone }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const id = setTimeout(() => {
      if (count > 1) {
        setCount(count - 1);
      } else {
        onDone();
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [count, onDone]);

  return <div className="countdown">{count}</div>;
};

export default Countdown;
