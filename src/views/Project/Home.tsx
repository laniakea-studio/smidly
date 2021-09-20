import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../_components/Button";
import theme from "../../theme/theme.js";
import { Layout } from "./_Layout";

export const ProjectHome: FC<{}> = () => {
  return (
    <Layout>
      <View>
        <Main>
          <header className="header">
            <h1>Overview</h1>
          </header>
        </Main>
      </View>
    </Layout>
  );
};

const View = styled.div`
  display: flex;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  height: 100vh;
  padding: 40px;
  .header {
    margin-bottom: 140px;
    display: flex;
    align-items: center;
    svg {
      width: 24px;
      path {
        fill: #000;
      }
    }
    h1 {
      padding-left: 10px;
      font-family: Metropolis;
      font-weight: 400;
      display: inline;
    }
    button {
      margin-left: auto;
    }
  }
`;
