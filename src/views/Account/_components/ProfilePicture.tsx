import React, { FC, useState, useRef, useLayoutEffect, DragEvent } from "react";
//https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import useComponentVisible from "../../../hooks/useComponentVisible";
import { Link, useHistory } from "react-router-dom";

//CONTINUE
// https://www.newline.co/@andreeamaco/how-to-build-a-react-drag-and-drop-component-for-file-upload--bf8e5017
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
export const ProfilePicture: FC<{}> = () => {
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Drop");
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Drop");
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Drop");
  };

  return (
    <ProfilePictureBox>
      <UploadProfile>
        <div
          id="drop-area"
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={(e) => handleDragEnter(e)}
        >
          <form className="my-form">
            <input
              type="file"
              id="fileElem"
              multiple
              accept="image/*"
              onChange={() => console.log("")}
            />
            <label className="button" htmlFor="fileElem">
              Select some files
            </label>
          </form>
        </div>
        <SvgAddImage />
      </UploadProfile>
    </ProfilePictureBox>
  );
};

const UploadProfile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px dashed #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 30px;
    height: 30px;
    path {
      fill: #bdbdbd;
    }
  }
`;

const ProfilePictureBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const SvgAddImage = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19 7V9.99C19 9.99 17.01 10 17 9.99V7H14C14 7 14.01 5.01 14 5H17V2H19V5H22V7H19ZM16 11V8H13V5H5C3.9 5 3 5.9 3 7V19C3 20.1 3.9 21 5 21H17C18.1 21 19 20.1 19 19V11H16ZM8 15L5 19H17L13 14L10 18L8 15Z"
      fill="#BDBDBD"
    />
  </svg>
);
