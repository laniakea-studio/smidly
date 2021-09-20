import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export interface ModalProps {
  isShown: boolean;
  closeModal: () => void;
  modalContent: JSX.Element;
  headerText?: string;
}

export const Modal: FC<ModalProps> = ({
  isShown,
  closeModal,
  modalContent,
  headerText,
}) => {
  const modal = (
    <>
      <Backdrop />
      <ModalDiv>
        <header>
          <h3>{headerText}</h3>
          <button onClick={closeModal}>
            <SvgClose />
          </button>
        </header>
        {modalContent}
      </ModalDiv>
    </>
  );
  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

const ModalDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 600;
  width: 100%;
  max-width: 700px;
  outline: 0;
  background: #fff;
  border-radius: 5px;
  header {
    display: flex;
    justify-content: space-between;
    padding: 40px;
  }
  button:hover svg line {
    stroke: #000;
  }
`;
const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(10, 36, 66, 0.2);
  z-index: 500;
`;

const SvgClose = () => (
  <svg
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="1.31313"
      y1="17.9799"
      x2="18.6465"
      y2="0.646609"
      stroke="#929292"
    />
    <line
      x1="1.35355"
      y1="0.646447"
      x2="18.6869"
      y2="17.9798"
      stroke="#929292"
    />
  </svg>
);
