import React, { FC, useState } from "react";
//import { firestore } from "firebase-admin";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../../_components/Button";
import { InputText } from "../../_components/Inputs";
import { removeProject } from "../../../db/mutateData";
// @ts-ignore
import Fade from "react-reveal/Fade";
import { addProject } from "../../../db/mutateData";
import { useProject } from "../../../context/ProjectContext";

interface RemoveProjectProps {
  closeModal: () => void;
}

export const RemoveProject: FC<RemoveProjectProps> = ({ closeModal }) => {
  const [data, setData] = useState({
    inputVerification: "",
  });
  const [loading, setLoading] = useState(false);
  const { currentProject, currentProjectId } = useProject();

  const history = useHistory();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let key = e.currentTarget.name;
    let value = e.currentTarget.value;

    setData({ ...data, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.inputVerification !== "DELETE") return;

    try {
      setLoading(true);
      const response = await removeProject(currentProjectId);
      console.log("Project Removed Response: ", response);
      history.push(`/account/projects`);
    } catch {
      console.log("Failed to remove project");
    }

    setLoading(false);
  };

  return (
    <Div>
      <h3>Remove Project: {currentProject.projectName}</h3>
      <form>
        <InputText
          name="inputVerification"
          label="If you are sure, type DELETE and press Remove"
          onChange={handleChange}
          //onBlur={onBlurCheck}
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          style={{ background: "tomato", borderColor: "tomato" }}
        >
          {loading ? (
            <>
              <div className="spinner" />
            </>
          ) : (
            "Remove"
          )}
        </Button>
      </form>
    </Div>
  );
};

const Div = styled.div`
  max-width: 400px;
  align-self: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 40px 80px;

  h3 {
    margin-top: -62px;
    margin-bottom: 50px;
  }
  .inputFeedback {
    margin-top: -18px;
    p {
      color: tomato;
      font-size: 13px;
    }
  }
  button {
    margin-top: 20px;
  }
  .spinner {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-left-color: #fff;
    border-top-color: #fff;
    animation: spin 0.6s infinite linear;
  }
  @keyframes spin {
    to {
      transform: rotate(359deg);
    }
  }
`;
