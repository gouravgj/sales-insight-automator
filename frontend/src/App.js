import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    console.log("Button clicked");

    if (!file || !email) {
      alert("Please select file and enter email");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      console.log("Sending request...");

      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        formData,
      );

      console.log(res.data);

      setMsg(res.data.message);
    } catch (error) {
      console.error(error);

      setMsg("Error occurred");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Sales Insight Automator</h2>

      <input
        type="file"
        onChange={(e) => {
          console.log("File selected", e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <button onClick={submit}>Generate Report</button>

      <p>{msg}</p>
    </div>
  );
}

export default App;
