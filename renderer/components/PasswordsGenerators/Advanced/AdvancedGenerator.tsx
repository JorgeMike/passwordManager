import React, { FormEvent, useEffect, useState } from "react";
import useBootstrap from "../../../hooks/useBootstrap";
import crypto, { BinaryToTextEncoding } from "crypto";
import { FaRegQuestionCircle, FaTrash } from "react-icons/fa";
import GeneratedPasswordDisplay from "../../GeneratedPasswordDisplay/GeneratedPasswordDisplay";
import toast from "react-hot-toast";
import socialNetworks from "../../../utils/socialNetworks.json";
import Modal from "../../Modals/Modal";
import AditionalDataModal from "../../Modals/AditionalDataModal";
import Input from "../../Inputs/Input";
import SaveConfiguration from "../../Modals/SaveConfiguration";

export interface OptionSelect {
  id: number;
  label: string;
}

export interface AdditionalData {
  label: string;
  type: "text" | "email" | "select";
  value: string;
  options?: OptionSelect[];
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
    hash.update(email + password + additionalData.map((data) => data.value));
    return hash.digest(codification).slice(0, passwordLength);
  };

  const handleGeneratePassword = (e) => {
    e.preventDefault();
    const newPassword = generatePassword(email, password);
    console.log(additionalData);
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
    console.log(newInput);
    setAdditionalData((prev) => [...prev, newInput]);

    const button = document.querySelector(
      "#aditionalData .btn-close"
    ) as HTMLElement;
    button.click();
  };

  const handleOnChangeValue = (index: number, value: string) => {
    const newAdditionalData = [...additionalData];
    newAdditionalData[index].value = value;
    setAdditionalData(newAdditionalData);
  };

  const handleOnDeleteData = (index: number) => {
    setAdditionalData(additionalData.filter((_, i) => i !== index));
  };

  return (
    <>
      <Modal id="saveConfiguration" title="Save this configuration">
        <SaveConfiguration
          email={email}
          passwordLength={passwordLength}
          additionalData={additionalData}
          codification={codification}
        />
      </Modal>
      <Modal id="aditionalData" title="Add aditional data">
        <AditionalDataModal
          onAdd={handleAddAdditionalData}
          lastId={additionalData.length}
        />
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
                <option value="" disabled>
                  Open this select menu
                </option>
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

        <Input
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {additionalData.map((data, index) => (
          <div className="d-flex gap-2 w-100 mb-3" key={index}>
            {data.type === "select" ? (
              <div className="form-floating" style={{ flex: 1 }}>
                <select
                  className="form-select"
                  required
                  value={data.value}
                  onChange={(e) => handleOnChangeValue(index, e.target.value)}
                >
                  <option value="" disabled>
                    Open this select menu
                  </option>
                  {data.options.map((option) => (
                    <option key={option.id} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingSelect">{data.label}</label>
              </div>
            ) : (
              <div className="form-floating" style={{ flex: 1 }}>
                <input
                  type={data.type}
                  className="form-control"
                  id="password"
                  placeholder={data.label}
                  value={data.value}
                  onChange={(e) => handleOnChangeValue(index, e.target.value)}
                  required
                />
                <label htmlFor="password">{data.label}</label>
              </div>
            )}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleOnDeleteData(index)}
            >
              <FaTrash />
            </button>
          </div>
        ))}

        <button
          type="button"
          data-bs-toggle="modal"
          className="btn btn-primary w-100 text-white mb-3"
          data-bs-target="#aditionalData"
          disabled={additionalData.length >= 5}
        >
          {additionalData.length >= 5 ? "Max 5 additional data" : "Add data"}
        </button>

        <button type="submit" className="btn btn-primary w-100 text-white">
          Generate Password
        </button>
        {generatedPassword && (
          <button
            type="button"
            className="btn btn-success w-100 text-white mt-3"
            data-bs-toggle="modal"
            data-bs-target="#saveConfiguration"
          >
            Save configuration
          </button>
        )}
      </form>
      <GeneratedPasswordDisplay generatedPassword={generatedPassword} />
    </>
  );
}
