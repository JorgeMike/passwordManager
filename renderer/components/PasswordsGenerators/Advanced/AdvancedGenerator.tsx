import React, { FormEvent, useState } from "react";
import useBootstrap from "../../../hooks/useBootstrap";
import crypto, { BinaryToTextEncoding } from "crypto";
import { FaRegQuestionCircle } from "react-icons/fa";
import GeneratedPasswordDisplay from "../../GeneratedPasswordDisplay/GeneratedPasswordDisplay";
import toast from "react-hot-toast";
import socialNetworks from "../../../utils/socialNetworks.json";
import Modal from "../../Modals/Modal";
import AditionalDataModal from "../../Modals/AditionalDataModal";

export interface AdditionalData {
  label: string;
  type: "text" | "email" | "select";
  value: string;
  options?: string[];
}

export default function AdvancedGenerator() {
  useBootstrap();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [codification, setCodification] =
    useState<BinaryToTextEncoding>("base64");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [additionalData, setAdditionalData] = useState<AdditionalData[]>([]);

  const generatePassword = (email: string, password: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(email + password);
    return hash.digest(codification).slice(0, passwordLength);
  };

  const handleGeneratePassword = (e) => {
    e.preventDefault();
    const newPassword = generatePassword(email, password);
    console.log(newPassword);
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

    if (value > 35) {
      toast.error("Password length should be less than 25");
      return;
    }

    setPasswordLength(value);
  };

  const handleAddAdditionalData = (
    e: FormEvent<HTMLFormElement>,
    newInput: AdditionalData
  ) => {
    e.preventDefault();
    setAdditionalData([...additionalData, newInput]);

    const button = document.querySelector(
      "#aditionalData .btn-close"
    ) as HTMLElement;
    button.click();
  };

  return (
    <>
      <Modal id="aditionalData" title="Add aditional data">
        <AditionalDataModal onAdd={handleAddAdditionalData} />
      </Modal>
      <form
        className="p-4 bg-secondary rounded-3 shadow"
        onSubmit={handleGeneratePassword}
        style={{ width: "400px" }}
      >
        <h5 className="mb-4 gap-2 d-flex justify-content-center align-items-center">
          Advanced Generator{" "}
          <span
            className="d-inline-block"
            tabIndex={0}
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-title="About Advanced Generator"
            data-bs-content="This generator creates a password hash by combining the entered email and password. The default password length is 16 characters, ensuring a high level of security."
          >
            <FaRegQuestionCircle className="text-primary" />
          </span>
        </h5>

        <div className="row g-2 mb-3">
          <div className="col-5">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="passwordLength"
                placeholder="12"
                value={passwordLength === 0 ? "" : passwordLength}
                onChange={handleChangedPasswordLength}
                required
              />
              <label htmlFor="passwordLength">Password length</label>
            </div>
          </div>
          <div className="col-7">
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelectGrid"
                value={codification}
                onChange={(e) => setCodification(e.target.value as any)}
              >
                <option value="">Open this select menu</option>
                <option value="base64">Base64</option>
                <option value="hex">Hex</option>
                <option value="binary">Binary</option>
              </select>
              <label htmlFor="floatingSelectGrid">
                Select the codification
              </label>
            </div>
          </div>
        </div>

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

        {additionalData.map((data, index) => (
          <div key={index} className="form-floating mb-3">
            <input
              type={data.type}
              className="form-control"
              id={data.label}
              placeholder={data.label}
              value={data.value}
              onChange={(e) => {
                const newAdditionalData = [...additionalData];
                newAdditionalData[index].value = e.target.value;
                setAdditionalData(newAdditionalData);
              }}
            />
            <label htmlFor={data.label}>{data.label}</label>
          </div>
        ))}

        <button
          type="button"
          data-bs-toggle="modal"
          className="btn btn-primary w-100 text-white mb-3"
          data-bs-target="#aditionalData"
          disabled={additionalData.length >= 5}
        >
          Add aditional data
        </button>

        <button type="submit" className="btn btn-primary w-100 text-white">
          Generate Password
        </button>
      </form>
      <GeneratedPasswordDisplay generatedPassword={generatedPassword} />
    </>
  );
}
