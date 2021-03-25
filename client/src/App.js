import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    // test connection to API
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setData(JSON.stringify(data)))
      .catch((err) => console.log("Something went wrong!\n", err));
  }, []);

  return (
    <div>
      <header>
        <p>
          <code>{data}</code>
        </p>
      </header>
    </div>
  );
}

export default App;
