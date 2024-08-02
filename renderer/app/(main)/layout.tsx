import React, { ReactNode } from "react";
import Pills from "../../components/Pills/Pills";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-3">
        <Pills />
      </div>
      {children}
    </>
  );
}
