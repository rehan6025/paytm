import React, { useState } from "react";
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

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onchange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={"Rehan"}
            label="First Name"
          />
          <InputBox
            onchange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={"Ahmed"}
            label="Last Name"
          />
          <InputBox
            onchange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={"rehan@example.com"}
            label="Email"
          />
          <InputBox
            onchange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"********"}
            label="Password"
          />
          <div className="p-4">
            <Button
              label={"Sign Up"}
              onClick={async () => {
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
              }}
            />
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
