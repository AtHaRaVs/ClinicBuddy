import { useEffect, useState } from "react";
import UserRegistration from "./components/UserRegistration";

export default function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.text())
      .then(setMessage);
  }, []);

  return (
    <div>
      <div className="App">
        <UserRegistration />
      </div>
    </div>
  );
}
