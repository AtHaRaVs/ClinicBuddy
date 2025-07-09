import { useEffect, useState } from "react";
import PatientRegistration from "./components/patient/PatientRegistration";

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
        <PatientRegistration />
      </div>
    </div>
  );
}
