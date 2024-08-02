"use client";
import React, { useEffect, useState } from "react";
import LoginPills from "../../components/Pills/LoginPills";

export default function Page() {
  const [isThereUsers, setIsThereUsers] = useState<boolean>(false);

  useEffect(() => {
    window.ipc.send("is-there-users", "");

    window.ipc.on("is-there-users", (event: boolean, arg) => {
      setIsThereUsers(event);
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
      className="d-flex flex-column"
    >
      <div className="d-flex flex-column justify-content-center align-items-center mt-3">
        <LoginPills />
      </div>
      <div
        style={{
          flex: 1,
        }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        {isThereUsers ? (
          <h1>Welcome back!</h1>
        ) : (
          <h1>Welcome to your password manager</h1>
        )}
      </div>
    </div>
  );
}
