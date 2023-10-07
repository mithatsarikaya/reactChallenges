"use client";
import { useState } from "react";

const Count = () => {
  const [count, setCount] = useState<number>(0);
  console.count("render");
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        backgroundColor: "gray",
      }}
    >
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
      <h1>{count}</h1>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
    </div>
  );
};

export default Count;
