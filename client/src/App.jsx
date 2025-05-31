import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/")
      .then((res) => res.text())
      .then(setMessage);
  }, []);

  return (
    <div>
      <h1>Clinic Buddy</h1>
      <p>{message}</p>
    </div>
  );
}
