import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 w-screen h-screen flex justify-center items-center">
      <div>
        <Button
          onClick={() => {
            navigate("/signin");
          }}
          label={"Sign in"}
        />
        <Button
          onClick={() => {
            navigate("/signup");
          }}
          label={"Sign up"}
        />
      </div>
    </div>
  );
};

export default Home;
