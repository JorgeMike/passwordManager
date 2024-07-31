"use client";
import React, { useState } from "react";
import crypto from "crypto";
import GeneratedPasswordDisplay from "../../GeneratedPasswordDisplay/GeneratedPasswordDisplay";
import useBootstrap from "../../../hooks/useBootstrap";
import { FaRegQuestionCircle } from "react-icons/fa";

export default function SimpleGenerator() {
  useBootstrap();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = (email: string, password: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(email + password);
    return hash.digest("base64").slice(0, 16);
  };

  const handleGeneratePassword = (e) => {
    e.preventDefault();
    const newPassword = generatePassword(email, password);
    console.log(newPassword);
    setGeneratedPassword(newPassword);
  };

  return (
    <>
      <form
        className="p-4 bg-secondary rounded-3 shadow"
        onSubmit={handleGeneratePassword}
        style={{ width: "400px" }}
      >
        <h5 className="mb-4 gap-2 d-flex justify-content-center align-items-center">
          Simple Generator{" "}
          <span
            className="d-inline-block"
            tabIndex={0}
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-title="About Simple Generator"
            data-bs-content="This generator creates a password hash by combining the entered email and password. The default password length is 16 characters, ensuring a high level of security."
          >
            <FaRegQuestionCircle className="text-primary" />
          </span>
        </h5>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-primary w-100 text-white">
          Generate Password
        </button>
      </form>
      <GeneratedPasswordDisplay generatedPassword={generatedPassword} />
    </>
  );
}
