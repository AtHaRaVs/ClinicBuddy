import { useEffect } from "react";
import { useState } from "react";
import UserLogin from "./components/UserLogin";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.text())
      .then(setMessage);
  }, []);

  return (
    <div>
      <UserLogin />
    </div>
  );
}
