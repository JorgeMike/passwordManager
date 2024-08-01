import React, { useState } from "react";
import GeneratedPasswordDisplay from "../../GeneratedPasswordDisplay/GeneratedPasswordDisplay";
import crypto from "crypto";
import toast from "react-hot-toast";
import socialNetworks from "../../../utils/socialNetworks.json";
import { FaRegQuestionCircle } from "react-icons/fa";
import useBootstrap from "../../../hooks/useBootstrap";
import Input from "../../Inputs/Input";

export default function MediumGenerator() {
  useBootstrap();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [socialNetwork, setSocialNetwork] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = (
    email: string,
    password: string,
    socialNetwork: string,
    length: number
  ) => {
    const hash = crypto.createHash("sha256");
    hash.update(email + password + socialNetwork);
    return hash.digest("base64").slice(0, length);
  };

  const handleGeneratePassword = (e) => {
    e.preventDefault();
    const newPassword = generatePassword(
      email,
      password,
      socialNetwork,
      passwordLength
    );
    setGeneratedPassword(newPassword);
  };

  const handleChangedPasswordLength = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);

    if (isNaN(value)) {
      toast.error("Password length should be a number");
      setPasswordLength(0);
      return;
    }

    if (value > 25) {
      toast.error("Password length should be less than 25");
      return;
    }

    setPasswordLength(value);
  };

  return (
    <>
      <form
        className="p-4 bg-secondary rounded-3 shadow"
        onSubmit={handleGeneratePassword}
        style={{ width: "400px" }}
      >
        <h5 className="mb-4 gap-2 d-flex justify-content-center align-items-center">
          Medium Generator{" "}
          <span
            className="d-inline-block"
            tabIndex={0}
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-title="About Medium Generator"
            data-bs-content="This medium-level generator allows you to customize the password length and associate it with a specific social network, providing an additional layer of security and specificity."
          >
            <FaRegQuestionCircle className="text-primary" />
          </span>
        </h5>
        <Input
          type="text"
          id="passwordLength"
          label="Password length"
          value={passwordLength === 0 ? "" : passwordLength}
          onChange={handleChangedPasswordLength}
        />

        <Input
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Select Social Network"
            onChange={(e) => setSocialNetwork(e.target.value)}
            value={socialNetwork}
          >
            <option value="">Open this select menu</option>
            {socialNetworks.map((network) => (
              <option key={network.id} value={network.id}>
                {network.name}
              </option>
            ))}
          </select>
          <label htmlFor="floatingSelect">Social Network</label>
        </div>

        <Input
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit" className="btn btn-primary w-100 text-white">
          Generate Password
        </button>
      </form>
      <GeneratedPasswordDisplay generatedPassword={generatedPassword} />
    </>
  );
}
