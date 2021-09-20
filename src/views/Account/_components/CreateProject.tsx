import React, { FC, useState } from "react";
//import { firestore } from "firebase-admin";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../../_components/Button";
import { InputText } from "../../_components/Inputs";
// @ts-ignore
import Fade from "react-reveal/Fade";
import { addProject } from "../../../db/mutateData";

interface CreateProjectProps {
  closeModal: () => void;
  onSucces: () => void;
}

export const CreateProject: FC<CreateProjectProps> = ({
  closeModal,
  onSucces,
}) => {
  const [data, setData] = useState({
    owner_id: "",
    admins_id: [],
    editors_id: [],
    models: [],
    projectName: "",
    projectSlug: "",
    plan: "free",
    status: "waitForFirstDeploy",
    timestamp_created: null,
    timestamp_last_published: null,
    timestamp_updated: null,
  });
  const [fieldCheck, setFieldCheck] = React.useState({
    hasNameValue: false,
  });
  const [inputFeedback, setInputFeedback] = React.useState<string | null>(null);
  const [buttonMessage, setButtonMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let key = e.currentTarget.name;
    let value = e.currentTarget.value;

    setData({ ...data, [key]: value });
  };

  React.useEffect(() => {
    setFieldCheck(checkIfValid());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const checkIfValid = () => {
    const object = {
      hasNameValue: data.projectName.length > 2 ? true : false,
    };
    if (object.hasNameValue) {
      setInputFeedback(null);
    }
    return object;
  };

  const onBlurCheck = () => {
    if (!fieldCheck.hasNameValue) {
      setInputFeedback("Give a name with at least 3 characters");
    } else {
      setInputFeedback(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldCheck.hasNameValue) return;

    let response;
    try {
      setLoading(true);
      response = await addProject(data);
      console.log("Jes", response);
      closeModal();
      onSucces();
    } catch {
      setButtonMessage("Failed to create account");
    }

    setLoading(false);
  };

  return (
    <Div>
      <h3>Start New Project</h3>
      <form>
        <InputText
          name="projectName"
          label="Project Name"
          onChange={handleChange}
          onBlur={onBlurCheck}
        />
        <Fade collapse when={inputFeedback} duration={400}>
          <div
            className="inputFeedback invalid-feedback"
            style={{ display: "block" }}
          >
            <p>{inputFeedback}</p>
          </div>
        </Fade>
        <InputText
          name="projectSlug"
          hint={`E.g. ${
            data.projectSlug === "" ? "your-project" : data.projectSlug
          }.smidly.io`}
          label={`Project Slug`}
          onChange={handleChange}
          onBlur={onBlurCheck}
        />
        <Button onClick={handleSubmit} type="submit">
          {loading ? (
            <>
              <div className="spinner" />
            </>
          ) : (
            "Create"
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
