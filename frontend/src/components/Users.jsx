import React from "react";
import Button from "./Button";

const Users = () => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="bg-slate-200 w-12 h-12 rounded-full flex justify-center mt-1 mr-2">
          <div className="flex justify-center flex-col h-full text-xl">R</div>
        </div>
        <div className="flex flex-col justify-center h-full">Rehan Ahmed</div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
};

export default Users;
