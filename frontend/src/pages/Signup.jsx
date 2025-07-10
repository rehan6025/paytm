import React, { useRef, useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignUp = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }
    );

    localStorage.setItem("token", response.data.token);

    navigate("/dashboard");
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            ref={firstNameRef}
            onKeyDown={(e) => {
              e.key === "Enter" && lastNameRef.current.focus();
            }}
            onchange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={"Rehan"}
            label="First Name"
          />
          <InputBox
            ref={lastNameRef}
            onKeyDown={(e) => {
              e.key === "Enter" && emailRef.current.focus();
            }}
            onchange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={"Ahmed"}
            label="Last Name"
          />
          <InputBox
            ref={emailRef}
            onKeyDown={(e) => {
              e.key === "Enter" && passwordRef.current.focus();
            }}
            onchange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={"rehan@example.com"}
            label="Email"
          />
          <InputBox
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSignUp();
              }
            }}
            ref={passwordRef}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"********"}
            label="Password"
          />
          <div className="p-4">
            <Button label={"Sign Up"} onClick={handleSignUp} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
