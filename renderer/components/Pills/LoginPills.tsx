import Link from "next/link";
import React from "react";
import { FaHome, FaUser } from "react-icons/fa";

export default function LoginPills() {
  return (
    <nav className="d-flex align-items-center justify-content-center gap-2">
      <Link
        href={"/"}
        className={`btn btn-primary d-flex align-items-center justify-content-center  text-white border rounded-circle `}
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <FaHome size={20} />
      </Link>
      <Link
        href={"/login"}
        className="btn btn-primary d-flex align-items-center justify-content-center  text-white border rounded-circle"
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <FaUser size={20} />
      </Link>
    </nav>
  );
}
