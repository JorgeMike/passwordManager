import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegClipboard } from "react-icons/fa";

const GeneratedPasswordDisplay = ({ generatedPassword }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    generatedPassword && (
      <div
        className="mt-4 bg-secondary rounded-3 p-2 text-center shadow py-3"
        style={{ width: "300px" }}
      >
        <h6>Generated Password:</h6>
        <p className="d-flex justify-content-center align-items-center m-0 gap-2">
          {generatedPassword}{" "}
          <CopyToClipboard text={generatedPassword} onCopy={handleCopy}>
            <button className="border-0 p-0 m-0 py-2 px-2 rounded align-items-center justify-content-center d-flex bg-primary">
              <FaRegClipboard />
            </button>
          </CopyToClipboard>
        </p>
        {copied && <p className="m-0 text-success mt-2">¡Copiado!</p>}
      </div>
    )
  );
};

export default GeneratedPasswordDisplay;
