import React, { FC } from "react";
import styled from "styled-components";
import { PublicLayout } from "./Layout";

export const Home: FC<{}> = () => {
  return (
    <PublicLayout>
      <Main>
        <h1>Home</h1>
      </Main>
    </PublicLayout>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  h1 {
    color: tomato;
  }
`;
