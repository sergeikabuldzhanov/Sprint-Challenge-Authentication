import React, { useState } from "react";
import axios from "axios";

export default function Register(props) {
  const [error, setError] = useState();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = form => {
    axios
      .post("http://localhost:5000/api/auth/register", form)
      .then(res => {
        props.history.push("/login");
      })
      .catch(error => {
        setError(error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">
        <input type="text" name="username" onChange={onChange} />
        {error && <p>{error.message}</p>}
      </label>
      <label htmlFor="password">
        <input type="password" name="password" onChange={onChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
