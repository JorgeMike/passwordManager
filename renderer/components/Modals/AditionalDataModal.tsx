import React, { FormEvent, useState } from "react";
import { AdditionalData } from "../PasswordsGenerators/Advanced/AdvancedGenerator";

interface AditionalDataModalProps {
  onAdd: (e: FormEvent<HTMLFormElement>, aditionalData: AdditionalData) => void;
}

export default function AditionalDataModal({ onAdd }: AditionalDataModalProps) {
  const [aditionalData, setAditionalData] = useState<AdditionalData>({
    label: "",
    type: "text",
    value: "",
  });

  const handleOnChangeNewField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAditionalData({
      ...aditionalData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <div className="alert alert-primary" role="alert">
        Customize your password even more, add up to 5 additional fields to your
        password configuration.
      </div>
      <form onSubmit={(e) => onAdd(e, aditionalData)}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="label"
            placeholder="Label"
            required
            value={aditionalData.label}
            onChange={handleOnChangeNewField}
          />
          <label htmlFor="label">Label</label>
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="type"
            required
            value={aditionalData.type}
            onChange={handleOnChangeNewField}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="select">Select</option>
          </select>
          <label htmlFor="type">Type</label>
        </div>

        {aditionalData.type === "select" && (
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="options"
              placeholder="Option 1, Option 2, Option 3"
              value={aditionalData.options?.join(", ")}
              onChange={(e) =>
                setAditionalData({
                  ...aditionalData,
                  options: e.target.value.split(","),
                })
              }
            />
            <label htmlFor="options">Options</label>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100 text-white mb-3">
          Add
        </button>
      </form>
    </div>
  );
}
