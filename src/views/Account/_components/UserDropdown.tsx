import React, { FC, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import useComponentVisible from "../../../hooks/useComponentVisible";
import { Link, useHistory } from "react-router-dom";

interface TypeUserData {
  name: string;
  company: string;
}

interface UserDropdownProps {
  userData: TypeUserData;
}

export const UserDropdown: FC<UserDropdownProps> = ({ userData }) => {
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
        <div className="ball">
          <span>{userData?.name?.charAt(0).toUpperCase()}</span>
        </div>
      </button>
      {showDropOne && (
        <div className="dropdownBox" ref={dropdown}>
          <div className="content">
            <p className="name">{userData?.name}</p>
            <p className="email">{currentUser.email}</p>
            <p className="company">{userData?.company}</p>
          </div>
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
    .ball {
      width: 40px;
      height: 40px;
      background: #236d85;
      border-radius: 50%;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      font-weight: 400;
    }
  }
  .content {
    padding: 20px;
  }
  .name {
    font-size: 18px;
    font-weight: 500;
  }
  .company {
    margin-top: 0;
  }
  .email {
    margin-top: 0;
    margin-bottom: 6px;
    color: #787878;
    font-size: 14px;
  }
  .dropdownBox {
    top: 42px;
    right: 0;

    background: #ffffff;
    box-shadow: 0px 4px 6px 6px rgba(231, 231, 231, 0.25);
    border-radius: 3px;
    letter-spacing: 0.03em;
    position: absolute;
    min-width: 220px;
    button {
      padding: 20px;
      width: 100%;
      border-radius: 0;
      text-align: right;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      &:hover {
        background: #f8f8f8;
      }
    }
  }
`;
