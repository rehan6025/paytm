import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
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
              label={"Sign In"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username: email,
                    password: password,
                  }
                );

                localStorage.setItem("token", response.data.token);

                navigate("/dashboard");
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
