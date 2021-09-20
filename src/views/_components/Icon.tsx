import * as React from "react";
import { css } from "styled-components/macro";
import theme from "../../theme/theme.js";

interface IconProps {
  icon: string;
}

export const Icon: React.FC<IconProps> = ({ icon }) => {
  switch (icon) {
    case "page":
      return <Page />;
    case "post":
      return <Posts />;
    case "posts":
      return <Posts />;
    case "blocks":
      return <Blocks />;
    default:
      return <></>;
  }
};

const Page = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.67332 2.66671C2.67332 1.93337 3.26666 1.33337 3.99999 1.33337H9.33332L13.3333 5.33337V13.3334C13.3333 14.0667 12.7333 14.6667 12 14.6667H3.99332C3.25999 14.6667 2.66666 14.0667 2.66666 13.3334L2.67332 2.66671ZM8.66666 2.33337V6.00004H12.3333L8.66666 2.33337Z" />
  </svg>
);

const Posts = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.6667 0.666626H2.66668C1.93334 0.666626 1.33334 1.26663 1.33334 1.99996V11.3333H2.66668V1.99996H10.6667V0.666626ZM10 3.33329L14 7.33329V14C14 14.7333 13.4 15.3333 12.6667 15.3333H5.32668C4.59334 15.3333 4.00001 14.7333 4.00001 14L4.00668 4.66663C4.00668 3.93329 4.60001 3.33329 5.33334 3.33329H10ZM13 7.99996H9.33334V4.33329L13 7.99996Z" />
  </svg>
);

const Blocks = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.99999 12H2.66666V3.33337H5.99999V12ZM9.99999 12H6.66666V8.00004H9.99999V12ZM10.6667 12H14V8.00004H10.6667V12ZM6.66666 7.33337V3.33337H14V7.33337H6.66666Z" />
  </svg>
);
