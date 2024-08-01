import React, { FormEvent, useState } from "react";
import { AdditionalData } from "../PasswordsGenerators/Advanced/AdvancedGenerator";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

interface AditionalDataModalProps {
  onAdd: (e: FormEvent<HTMLFormElement>, aditionalData: AdditionalData) => void;
  lastId: number;
}

export default function AditionalDataModal({
  onAdd,
  lastId,
}: AditionalDataModalProps) {
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

  const handleOnAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(e, aditionalData);
    setAditionalData({
      label: "",
      type: "text",
      value: "",
    });
  };

  const handleOnAddOption = () => {
    console.log("Add option");

    if (aditionalData.options && aditionalData.options.length >= 5) {
      toast.error("You can only add up to 5 options");
      return;
    }

    setAditionalData({
      ...aditionalData,
      options: [
        ...(aditionalData.options || []),
        { id: aditionalData.options?.length || 0, label: "" },
      ],
    });
  };

  const handleOnEditOption = (index: number, value: string) => {
    console.log("Edit option", index, value);
    setAditionalData({
      ...aditionalData,
      options: aditionalData.options?.map((option, i) =>
        i === index ? { ...option, label: value } : option
      ),
    });
  };

  const handleDeleteOption = (index: number) => {
    console.log("Delete option", index);
    setAditionalData({
      ...aditionalData,
      options: aditionalData.options?.filter((o, i) => i !== index),
    });
  };

  return (
    <div>
      <div className="alert alert-primary" role="alert">
        Customize your password even more, add up to 5 additional fields to your
        password configuration.
      </div>
      <form onSubmit={(e) => handleOnAdd(e)}>
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

        {aditionalData.type === "select" && aditionalData.options && (
          <div>
            {aditionalData.options.map((option, index) => (
              <div key={index} className="d-flex gap-2 w-100 mb-3">
                <div className="form-floating" style={{ flex: 1 }}>
                  <input
                    type="text"
                    className="form-control"
                    id="label"
                    placeholder="Label"
                    value={option.label}
                    onChange={(e) => handleOnEditOption(index, e.target.value)}
                    required
                  />
                  <label htmlFor="label">Label</label>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => handleDeleteOption(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}

        {aditionalData.type === "select" && (
          <button
            type="button"
            className="btn btn-primary w-100 text-white mb-3"
            onClick={handleOnAddOption}
          >
            Add option
          </button>
        )}

        <button type="submit" className="btn btn-primary w-100 text-white mb-3">
          Add
        </button>
      </form>
    </div>
  );
}
