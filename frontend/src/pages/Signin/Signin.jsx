import React, { useState } from "react";
import "./Signin.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("SignUp");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const payload =
    currentState === "SignUp"
      ? formData
      : { email: formData.email, password: formData.password };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentState === "SignUp") {
        try{
        const response = await axios.post("http://localhost:8080/api/auth/signup",payload);
        // response.data is the actual body sent by the backend
        const { success} = response.data; 
        if(success){
            navigate("/");
            console.log(success);
        }
        }catch(err){
            console.log(err.message);
        }
      setFormData({
    userName: "",
    email: "",
    password: "",
  });
    }else{
        try{
        const response = await axios.post("http://localhost:8080/api/auth/signin",payload);
        const { success} = response.data; 
        if(success){
            navigate("/");
            console.log(success);
        }
        }catch(err){
            console.log(err.message);
        }
    }
  };

  return (
    <div className="signIn-page">
      <div className="signIn-page-box">
        <h1>Notify</h1>
        <p>Welcome to Notify</p>
        <form  onSubmit={handleSubmit} className="signIn-page-form">
          {currentState === "SignUp" ? (
            <input
              type="text"
              name="userName"
              id=""
              placeholder="username"
              value={formData.userName}
              onChange={handleOnChange}
              required
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleOnChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleOnChange}
            required
          />
          <button type="submit">{currentState === "SignIn" ? "Sign-in" : "Sign-Up"}</button>
        </form>
        {currentState === "SignIn" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("SignUp")}>SignUp here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("SignIn")}>SignIn here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signin;
