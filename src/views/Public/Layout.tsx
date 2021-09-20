import { Children, FC, InputHTMLAttributes } from "react";
import { css } from "styled-components/macro";
import theme from "../../theme/theme.js";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { async } from "@firebase/util";

export const PublicLayout: FC<{}> = ({ children }) => {
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
    <View>
      <div className="headerBox">
        <Header>
          <div className="left">
            <SvgLogo />
          </div>
          <div className="center"></div>
          <div className="right">
            {currentUser && <Link to="/account/projects/">Dashboard</Link>}
            {!currentUser && <Link to="/login">Login</Link>}
          </div>
        </Header>
      </div>
      {children}
    </View>
  );
};

const Header = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  .right {
    text-align: right;
    button {
      margin-top: 20px;
      text-decoration: underline;
    }
  }
`;

const View = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fbfbfc;
  .headerBox {
    position: absolute;
    width: 100%;
  }
`;

const SvgLogo = () => (
  <svg
    width="62"
    height="20"
    viewBox="0 0 62 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.56013 12.156C8.48813 8.502 2.96213 9.636 2.96213 7.818C2.96213 7.242 3.44813 6.864 4.38413 6.864C5.37413 6.864 5.98613 7.386 6.05813 8.16H8.47013C8.32613 6.18 6.86813 4.866 4.45613 4.866C1.99013 4.866 0.514125 6.198 0.514125 7.854C0.514125 11.508 6.14813 10.374 6.14813 12.156C6.14813 12.732 5.60813 13.182 4.61813 13.182C3.61013 13.182 2.90813 12.606 2.81813 11.85H0.280125C0.388125 13.704 2.13413 15.162 4.63613 15.162C7.06613 15.162 8.56013 13.866 8.56013 12.156ZM24.5787 15H27.0987V9.15C27.0987 6.396 25.4067 4.884 23.0127 4.884C21.5547 4.884 20.2407 5.658 19.5927 6.792C18.9087 5.55 17.6307 4.884 16.0827 4.884C14.8407 4.884 13.7787 5.406 13.1487 6.234V5.028H10.6287V15H13.1487V9.492C13.1487 7.908 14.0307 7.08 15.3987 7.08C16.7307 7.08 17.6127 7.908 17.6127 9.492V15H20.1327V9.492C20.1327 7.908 21.0147 7.08 22.3647 7.08C23.6967 7.08 24.5787 7.908 24.5787 9.492V15ZM29.49 15H32.01V5.028H29.49V15ZM30.768 3.84C31.65 3.84 32.316 3.192 32.316 2.364C32.316 1.536 31.65 0.887999 30.768 0.887999C29.868 0.887999 29.22 1.536 29.22 2.364C29.22 3.192 29.868 3.84 30.768 3.84ZM33.8518 9.978C33.8518 13.092 35.8678 15.162 38.4058 15.162C39.9718 15.162 41.0878 14.442 41.6818 13.524V15H44.2378V1.68H41.6818V6.414C40.9978 5.478 39.7378 4.866 38.4238 4.866C35.8678 4.866 33.8518 6.864 33.8518 9.978ZM41.6998 10.014C41.6998 11.904 40.4398 12.948 39.0538 12.948C37.7038 12.948 36.4258 11.868 36.4258 9.978C36.4258 8.088 37.7038 7.08 39.0538 7.08C40.4398 7.08 41.6998 8.124 41.6998 10.014ZM46.699 15H49.219V1.68H46.699V15ZM55.9568 11.994L53.3828 5.028H50.5568L54.5528 14.748L52.3928 19.716H55.0748L61.2488 5.028H58.5668L55.9568 11.994Z"
      fill="#000"
    />
  </svg>
);
