import React, { FC, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import useComponentVisible from "../../../hooks/useComponentVisible";
import { Link, useHistory } from "react-router-dom";

export const UserDropdown: FC<{}> = () => {
  const {
    ref: dropdown,
    isComponentVisible: showDropOne,
    setIsComponentVisible: setShowDropOne,
  } = useComponentVisible(false);

  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Failed to logout");
    }
  };

  return (
    <Dropdown>
      <button onClick={() => setShowDropOne(true)}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 39 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.1918 19.5C38.1918 29.9934 29.6852 38.5 19.1918 38.5C8.69836 38.5 0.191774 29.9934 0.191774 19.5C0.191774 9.00659 8.69836 0.5 19.1918 0.5C29.6852 0.5 38.1918 9.00659 38.1918 19.5Z"
            fill="#236D85"
          />
          <path
            d="M23.7759 28H25.5519L19.4559 11.44H17.5599L11.4399 28H13.2159L14.6799 24.016H22.3119L23.7759 28ZM21.8079 22.624H15.1839L18.4959 13.552L21.8079 22.624Z"
            fill="white"
          />
        </svg>
      </button>
      {showDropOne && (
        <div className="dropdownBox" ref={dropdown}>
          <p>{currentUser.email}</p>
          <button onClick={(e) => handleLogout(e)}>Log out</button>
        </div>
      )}
    </Dropdown>
  );
};

const Dropdown = styled.div`
  position: relative;
  display: flex;
  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0;
  }

  .dropdownBox {
    top: 42px;
    right: 0;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0px 4px 6px 6px rgba(231, 231, 231, 0.25);
    border-radius: 3px;
    letter-spacing: 0.03em;
    font-family: poppins;
    font-size: 13px;

    position: absolute;
    button {
      width: 100%;
      text-align: right;
      padding: 0;
      text-transform: uppercase;
    }
  }
`;
