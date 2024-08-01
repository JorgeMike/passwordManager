import React, { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  type: "email" | "password" | "text";
  id: string;
  label: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  value,
  id,
  onChange,
  label,
  placeholder = "placeholder",
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <div className="d-flex gap-1 mb-3">
        <div className="form-floating" style={{ flex: 1 }}>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
          />
          <label htmlFor={id}>{label}</label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    );
  }

  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
