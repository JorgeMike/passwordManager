import React from "react";

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ id, title, children }: ModalProps) {
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="d-flex justify-content-between m-3 border-bottom">
            <h4>{title}</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body py-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
