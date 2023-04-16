import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { useUserContextApi } from "../../contextApi/Context/Usercontext";

const Logon = () => {
    const {UserLogin} = useUserContextApi()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
  const loginHandler = (e) => {
    e.preventDefault();
    UserLogin(email,password , navigate)
  };
  return (
    <div className="login">
    <form className="loginForm" onSubmit={loginHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        Social Aap
      </Typography>

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Link to="/forgot/password">
        <Typography>Forgot Password?</Typography>
      </Link>

      <Button type="submit">Login</Button>

      <Link to="/register">
        <Typography>New User?</Typography>
      </Link>
    </form>
  </div>
  )
}

export default Logon
