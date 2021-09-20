import { Children, FC, InputHTMLAttributes } from "react";
import { css } from "styled-components/macro";
import theme from "../../theme/theme.js";
import styled from "styled-components";
import { Navigation } from "./_components/Navigation";

export const Layout: FC<{}> = ({ children }) => {
  return (
    <View>
      <Navigation />
      {children}
    </View>
  );
};

const View = styled.div`
  display: flex;
  min-height: 100vh;
  background: #fbfbfc;
`;
