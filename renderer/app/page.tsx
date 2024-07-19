"use client";
import React, { useState } from "react";
import crypto from "crypto";
import GeneratedPasswordDisplay from "../components/GeneratedPasswordDisplay/GeneratedPasswordDisplay";

export default function Page() {
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = (email, alias, password) => {
    const hash = crypto.createHash("sha256");
    hash.update(email + alias + password);
    return hash.digest("base64").slice(0, 16);
  };

  const handleGeneratePassword = (e) => {
    e.preventDefault();
    const newPassword = generatePassword(email, alias, password);
    setGeneratedPassword(newPassword);
  };

  return (
    <div
      style={{
        flex: 1,
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <form
        className="p-4 bg-secondary rounded-3 shadow"
        onSubmit={handleGeneratePassword}
        style={{ width: "400px" }}
      >
        <h5 className="text-center mb-4">Password Manager</h5>
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
            type="text"
            className="form-control"
            id="socialNetwork"
            placeholder="Alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
          />
          <label htmlFor="alias">Social Network</label>
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
          Generar Contraseña
        </button>
      </form>
      <GeneratedPasswordDisplay generatedPassword={generatedPassword} />
    </div>
  );
}
