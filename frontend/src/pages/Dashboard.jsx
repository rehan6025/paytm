import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const accountDetails = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data);
      setBalance(accountDetails.data.balance);
    }
    getData();
  }, []);

  return (
    <div>
      <AppBar name={user?.firstName || "Loading..."} />
      <div className="m-8">
        <Balance value={balance ? balance : 0} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
