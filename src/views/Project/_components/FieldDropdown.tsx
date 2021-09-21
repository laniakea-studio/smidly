import React, { FC, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import useComponentVisible from "../../../hooks/useComponentVisible";
import { Link, useHistory } from "react-router-dom";
import short from "short-uuid";

interface TypeTextField {
  id: string;
  type: string;
  fieldId: string;
  title: string;
  hint: string;
  required: boolean;
  localization: boolean;
  value?: any;
}

interface FieldDropdownProps {
  field: TypeTextField;
  index: number;
  duplicateField: (arg0: TypeTextField, arg1: number) => void;
  removeField: (arg0: string) => void;
}

export const FieldDropdown: FC<FieldDropdownProps> = ({
  field,
  index,
  duplicateField,
  removeField,
}) => {
  const {
    ref: dropdown,
    isComponentVisible: showDropOne,
    setIsComponentVisible: setShowDropOne,
  } = useComponentVisible(false);

  const handleDuplicate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const newField = { ...field };
    newField.id = short.generate();
    newField.fieldId = `${field.fieldId}_copy`;

    duplicateField(newField, index);
    setShowDropOne(false);
  };
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    removeField(field.id);
    setShowDropOne(false);
  };

  return (
    <Dropdown>
      <button className="drop" onClick={() => setShowDropOne(true)}>
        <div className="circle">
          <SvgDots />
        </div>
      </button>
      {showDropOne && (
        <div className="dropdownBox" ref={dropdown}>
          <button onClick={(e) => handleDuplicate(e)}>Duplicate</button>
          <button className="remove" onClick={(e) => handleRemove(e)}>
            Remove
          </button>
        </div>
      )}
    </Dropdown>
  );
};

const Dropdown = styled.div`
  position: relative;
  display: flex;

  button.drop {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0;
    .circle {
      height: 22px;
      width: 22px;
      border-radius: 11px;

      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
  .dropdownBox {
    top: 42px;
    right: 0;
    background: #ffffff;
    box-shadow: 0px 4px 6px 6px rgba(231, 231, 231, 0.25);
    border-radius: 3px;
    letter-spacing: 0.05em;
    font-family: poppins, sans-serif;
    font-size: 13px;
    position: absolute;
    z-index: 10;
    button {
      padding: 15px 20px;
      width: 100%;
      text-align: right;
      text-transform: uppercase;
      color: #444444;
      &.remove {
        color: tomato;
      }
      &:hover {
        background: #f8f8f8;
      }
    }
  }
`;

const SvgDots = () => (
  <svg
    width="3"
    height="13"
    viewBox="0 0 3 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="1.60716"
      cy="11.1071"
      r="1.17857"
      transform="rotate(-90 1.60716 11.1071)"
      fill="#525360"
    />
    <circle
      cx="1.60716"
      cy="6.39296"
      r="1.17857"
      transform="rotate(-90 1.60716 6.39296)"
      fill="#525360"
    />
    <circle
      cx="1.60716"
      cy="1.67861"
      r="1.17857"
      transform="rotate(-90 1.60716 1.67861)"
      fill="#525360"
    />
  </svg>
);
