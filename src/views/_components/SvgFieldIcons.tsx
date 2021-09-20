import * as React from "react";
import { css } from "styled-components/macro";
import theme from "../../theme/theme.js";

interface IconProps {
  icon: string;
}

export const FieldIcon: React.FC<IconProps> = ({ icon }) => {
  switch (icon) {
    case "text":
      return <Text />;
    case "richText":
      return <RichText />;
    case "repeater":
      return <Repeater />;
    default:
      return <></>;
  }
};

const Text = () => (
  <svg
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.2534 17H17.2934L10.0214 0.511999H7.98141L0.709406 17H2.74941L4.40541 13.256H13.5974L15.2534 17ZM5.17341 11.48L9.01341 2.816L12.8294 11.48H5.17341Z"
      fill="black"
    />
  </svg>
);

const RichText = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6H21V8L3 8.01V6ZM21 11.01L3 11V13H21V11.01ZM3 16H15V18H3V16Z"
      fill="black"
    />
  </svg>
);

const Repeater = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 11H4V5H9V11ZM9 18H4V12H9V18ZM10 18H15V12H10V18ZM21 18H16V12H21V18ZM10 11H15V5H10V11ZM16 11V5H21V11H16Z"
      fill="black"
    />
  </svg>
);
