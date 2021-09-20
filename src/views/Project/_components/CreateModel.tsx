import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "../../_components/Button";
import { InputText } from "../../_components/Inputs";
// @ts-ignore
import Fade from "react-reveal/Fade";
import { useProject } from "../../../context/ProjectContext.js";
import { addModel } from "../../../db/mutateData";

interface CreateModelProps {
  closeModal: () => void;
  onSucces: (arg0: string) => void;
  modelType: string | null;
}

export const CreateModel: FC<CreateModelProps> = ({
  closeModal,
  onSucces,
  modelType,
}) => {
  const { currentProjectId } = useProject();
  const [data, setData] = useState({
    uid: "",
    project_id: currentProjectId,
    modelName: "",
    modelType: modelType,
    modelIcon: modelType,
    status: "draft",
    note: "",
    enableLocalization: false,
    fields: [],
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
      hasNameValue: data.modelName.length > 2 ? true : false,
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

    const modelDataToProjectDoc = {
      modelUid: data.uid,
      modelType: data.modelType,
      modelName: data.modelName,
      modelIcon: data.modelIcon,
    };

    let response;
    try {
      setLoading(true);
      response = await addModel(currentProjectId, data, modelDataToProjectDoc);
      console.log("Jes", response);
      closeModal();
      onSucces(data.uid);
    } catch {
      setButtonMessage("Failed to create account");
    }

    setLoading(false);
  };

  const readableType =
    modelType === "page"
      ? "Page"
      : modelType === "post"
      ? "Post Template"
      : modelType === "global"
      ? "Global Component"
      : null;

  return (
    <Div>
      <h3>New {readableType}</h3>
      <form>
        <InputText
          name="modelName"
          label={`${readableType} Name`}
          onChange={handleChange}
          onBlur={onBlurCheck}
        />

        <InputText
          name="uid"
          label="UID"
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
        <Fade collapse when={inputFeedback} duration={400}>
          <div
            className="inputFeedback invalid-feedback"
            style={{ display: "block" }}
          >
            <p>{inputFeedback}</p>
          </div>
        </Fade>
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
    margin-top: 10px;
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
