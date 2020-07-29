import React from "react";
import { Spring } from "react-spring/renderprops";
import "./Modal.scss";
import "../../styles/index.scss"

interface ModalProps {
  onModalShowChange: (show: boolean) => void;
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  children,
  onModalShowChange,
}) => {
  const handleCloseButtonClick = (value: boolean) => {
    onModalShowChange(value);
  };
  return (
    <Spring from={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0)' }} to={{ opacity: 1, transform: 'translate(-50%, -50%) scale(1)'}}>
      {(props) => (
          <div style={props} className={"Modal"}>
            <div className={"Content"}>{children}</div>
            <div className={"actions"}>
              <button
                className={"PrimaryButton Toggle"}
                onClick={() => handleCloseButtonClick(false)}
              >
                Close
              </button>
            </div>
          </div>
      )}
    </Spring>
  );
};
