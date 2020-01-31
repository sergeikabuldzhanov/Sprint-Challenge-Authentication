import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Jokes(props) {
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    Axios.get("http://localhost:5000/api/jokes")
      .then(res => {
        setJokes(res.data);
        setError("");
      })
      .catch(error => {
        console.error(error);
        setError(error);
      });
  }, [error]);
  if (jokes.length) {
    return (
      <section className="jokes">
        {jokes.map(joke => (
          <p>{joke.joke}</p>
        ))}
      </section>
    );
  } else {
    return <p>Looking for jokes...</p>;
  }
}
