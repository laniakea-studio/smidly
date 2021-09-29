import { Children, FC, InputHTMLAttributes } from "react";
import { css } from "styled-components/macro";
import theme from "../../../theme/theme.js";
import styled from "styled-components";
import { Layout } from "../_Layout";
import { Button } from "../../_components/Button";
import { RemoveProject } from "./RemoveProject";
import { Modal } from "../../_components/Modal";
import { useModal } from "../../../hooks/useModal";
import { useProject } from "../../../context/ProjectContext";

// TODO: Add Collaborators

export const SiteSettings: FC<{}> = () => {
  const { isShown, toggle } = useModal();

  const { currentProject } = useProject();
  return (
    <>
      <Modal
        isShown={isShown}
        closeModal={toggle}
        modalContent={<RemoveProject closeModal={toggle} />}
      />
      <Layout>
        <View>
          <Main>
            <header className="header">
              <h1>Site Settings</h1>
            </header>
            <div className="dangerZone">
              <h2>Danger Zone</h2>
              <Button
                onClick={toggle}
                style={{ background: "tomato", borderColor: "tomato" }}
              >
                Delete Project
              </Button>
            </div>
            <div className="collaborators">
              <h2>Collaborators</h2>
              <Button onClick={toggle}>Add Collaborator</Button>
            </div>
          </Main>
        </View>
      </Layout>
    </>
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
  h2 {
    margin-bottom: 30px;
  }
  .dangerZone {
  }
  .collaborators {
    margin-top: 70px;
  }
`;
