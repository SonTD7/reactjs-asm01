import React, { useState, useEffect } from "react";
import Loading from "./Loading";

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
}

export default App;