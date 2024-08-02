import React, { useEffect, useState } from "react";
import { AdditionalData } from "../PasswordsGenerators/Advanced/AdvancedGenerator";
import axios from "axios";
import toast from "react-hot-toast";

interface SaveConfigurationProps {
  email: string;
  passwordLength: number;
  codification: string;
  additionalData: AdditionalData[];
}

export default function SaveConfiguration({
  additionalData,
  codification,
  email,
  passwordLength,
}: SaveConfigurationProps) {
  const [configName, setConfigName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    window.ipc.on("insert-configuration", (event, arg) => {
      console.log("ARGS", event);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (configName.trim() === "") {
      setConfigName("");
      alert("Please enter a name for the configuration");
      return;
    }

    const configuration = {
      name: configName,
      description,
      email,
      passwordLength,
      codification,
      additionalData,
    };

    window.ipc.send("insert-configuration", configuration);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="alert alert-warning" role="alert">
        <strong>Before saving this configuration.</strong> Please note that you
        will not be able to edit these fields in the future.
      </div>

      <div className="mb-3">
        <label htmlFor="nameConfiguration" className="form-label">
          Give this configuration a name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="nameConfiguration"
          placeholder="Configuration name"
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
          required
        />
        <div className="form-text">
          This name will help you identify the configuration in the future.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="descriptionConfiguration" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          placeholder="Optional"
          id="descriptionConfiguration"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <div id="emailHelp" className="form-text">
          Add a description to help you remember the purpose of this
          configuration.
        </div>
      </div>
      <div>
        <h5>Configuration summary</h5>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item">
            Passwor length: <b>{passwordLength}</b>
          </li>
          <li className="list-group-item">
            Type of codification: <b>{codification}</b>
          </li>
          <li className="list-group-item">
            Email: <b>{email}</b>
          </li>
        </ul>
        {additionalData.length === 0 ? (
          <>
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">No additional data</h4>
              <p className="m-0">
                You have not added any additional data to this configuration,
                you can continue without adding it but it is recommended to add
                it.
              </p>
            </div>
          </>
        ) : (
          <>
            <h5>Aditional data</h5>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Label</th>
                </tr>
              </thead>
              <tbody>
                {additionalData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.type}</td>
                    <td>{data.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <button type="submit" className="btn btn-primary mb-3 w-100">
        Save
      </button>
    </form>
  );
}
