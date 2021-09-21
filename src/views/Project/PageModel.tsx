import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { FieldIcon } from "../_components/SvgFieldIcons";
import { Button } from "../_components/Button";
import theme from "../../theme/theme.js";
import { TextSettings } from "./_components/FieldSettings/TextSettings";
import equal from "fast-deep-equal";
import { getModel } from "../../db/queryData";
import { AddFieldPanel } from "./_components/AddFieldPanel";
import { Layout } from "./_Layout";
import { useProject } from "../../context/ProjectContext";
import { RichTextSettings } from "./_components/FieldSettings/RichTextSettings";
import { RemoveModel } from "./_components/RemoveModel";
import { Modal } from "../_components/Modal";
import { useModal } from "../../hooks/useModal";
import { Prompt, useParams } from "react-router";
import { updateModelFields } from "../../db/mutateData";
import { FieldDropdown } from "./_components/FieldDropdown";
import { startAfter } from "@firebase/firestore";
import { isSlug } from "../../utils/inputValidation";

// Todo: Add react-reveal for field items: https://www.react-reveal.com/examples/advanced/todo/

//TODO: This is duplicate
interface TypeTextField {
  type: string;
  fieldId: string;
  title: string;
  hint: string;
  required: boolean;
  localization: boolean;
  value?: any;
}

// Todo: Check types proparly
type ModelData = {
  uid: string;
  project_id: string;
  modelName: string;
  modelType: string;
  modelIcon: string;
  status: string;
  note: string;
  enableLocalization: boolean;
  fields: Array<any>;
  timestamp_created: null | object;
  timestamp_last_published: null | object;
  timestamp_updated: null | object;
};

export const PageModel: FC<{}> = () => {
  const [showSettings, setShowSettings] = useState(1);
  const [initialData, setInitialData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveBtn, setSaveBtn] = useState(0);

  const { isShown, toggle } = useModal();

  const { modelId, projectId }: { modelId: string; projectId: string } =
    useParams();

  const handleFieldSettingsChange = (field: any) => {
    const newFields = data?.fields.map((i: any) =>
      i.id === field.id ? { ...field } : i
    );

    setData({ ...data, fields: [...newFields] });
  };

  const addNewField = (defaultObject: any) => {
    setData({ ...data, fields: [...data.fields, defaultObject] });
  };

  console.log(data);

  const duplicateField = (field: any, index: number) => {
    const newFeldsArr = [
      ...data.fields.slice(0, index + 1),
      field,
      ...data.fields.slice(index + 1),
    ];

    setData({ ...data, fields: newFeldsArr });
  };

  const removeField = (id: string) => {
    const newFieldsArr = data.fields.filter((i: any) => i.id !== id);
    setData({ ...data, fields: newFieldsArr });
  };

  useEffect(() => {
    if (!equal(data, initialData)) {
      setUnsavedChanges(true);
      setSaveBtn(0);
    } else {
      setUnsavedChanges(false);
    }
  }, [data, initialData]);

  async function fetchData() {
    const data = await getModel(projectId, modelId);

    try {
      setData(data);
      setInitialData(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [modelId]);

  const handleSave = async () => {
    setSaveBtn(1);
    const result = await updateModelFields(projectId, modelId, data.fields);
    if (result === "success") {
      console.log("Data saved");
      await fetchData();
      setSaveBtn(3);
    }
  };

  return (
    <>
      <Prompt
        when={unsavedChanges}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <Modal
        isShown={isShown}
        closeModal={toggle}
        modalContent={<RemoveModel closeModal={toggle} modelId={modelId} />}
      />
      <Layout>
        {loading && <p>Loading...</p>}
        {!loading && (
          <View>
            <Main>
              <header className="header">
                <div>
                  <span>Model</span>
                  <br />
                  <h1>{data.modelName}</h1>
                </div>
                <Button disabled={!unsavedChanges} onClick={handleSave}>
                  {saveBtn === 0 && "Save"}
                  {saveBtn === 1 && <div className="spinner" />}
                  {saveBtn === 3 && "Changes Saved!"}
                </Button>
              </header>

              <div className="modelBoard">
                {data?.fields?.length > 0 &&
                  data?.fields.map((i: any, index: number) => (
                    <ModelBoardItem key={i.id}>
                      <div className="dragHandler">
                        <SvgDragHandler />
                      </div>
                      <div
                        className={
                          showSettings === index ? "card active" : "card"
                        }
                        onClick={() => setShowSettings(index)}
                      >
                        <div className="type">
                          <FieldIcon icon={i.type} />
                        </div>
                        <div className="content">
                          <div>
                            <h3>
                              {i.title}
                              {i.required && "*"}
                            </h3>
                            {i.hint && <span className="hint">{i.hint}</span>}
                          </div>
                        </div>
                        {i.localization && (
                          <div className="localization">
                            <SvgLocalization />
                          </div>
                        )}
                        <pre>{i.fieldId}</pre>
                      </div>
                      <div className="editCard">
                        <FieldDropdown
                          duplicateField={duplicateField}
                          removeField={removeField}
                          field={i}
                          index={index}
                        />
                      </div>
                    </ModelBoardItem>
                  ))}
              </div>

              <AddFieldPanel addNewField={addNewField} />
              <button onClick={toggle} style={{ textDecoration: "underline" }}>
                Delete model
              </button>
            </Main>
            <SettingsAside>
              <header>
                <FieldIcon icon={data?.fields[showSettings]?.type} />
                <h3>{data?.fields[showSettings]?.type}</h3>
              </header>
              <div className="fields">
                {data?.fields[showSettings]?.type === "text" && (
                  <TextSettings
                    data={data.fields[showSettings]}
                    setFieldSettings={handleFieldSettingsChange}
                  />
                )}
                {data?.fields[showSettings]?.type === "richText" && (
                  <RichTextSettings
                    data={data.fields[showSettings]}
                    setFieldSettings={handleFieldSettingsChange}
                  />
                )}
              </div>
            </SettingsAside>
          </View>
        )}
      </Layout>
    </>
  );
};

const SettingsAside = styled.aside`
  min-width: 360px;
  @media (max-width: 1300px) {
    min-width: 320px;
  }
  @media (max-width: 1200px) {
    min-width: 280px;
  }
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 40px;
  header {
    display: flex;
    align-items: center;

    h3 {
      text-transform: capitalize;
      font-size: 15px;
      padding-left: 20px;
    }
  }
  .fields {
    padding-top: 80px;
  }
`;

const ModelBoardItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  .card {
    display: flex;
    align-items: center;
    height: 70px;
    max-width: 90%;
    background: #fff;
    border: 1px solid #dfe0eb;
    border-radius: 4px;
    flex: 1;
    .localization {
      display: flex;
      align-items: center;
      padding: 20px;
      svg {
        width: 14px;
      }
      path {
        fill: #c5c5c5;
      }
    }
    pre {
      opacity: 0.9;
      margin-right: 10px;
    }
    &.active {
      border-color: #236d857a;
      box-shadow: 0px 0px 0px 1px #236d857a;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .type {
    width: 150px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    span {
      padding-left: 10px;
      font-size: 13px;
      color: #424141;
      text-transform: capitalize;
    }
  }

  .content {
    flex: 1;
  }
  h3 {
    font-size: 15px;
  }
  span.hint {
    font-size: 12px;
    color: #898989;
  }
  .dragHandler {
    flex-basis: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      cursor: grab;
      cursor: -moz-grab;
      cursor: -webkit-grab;
    }
  }
  .editCard {
    flex-basis: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

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
    span {
      color: #888888;
      letter-spacing: 1px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 4px;
    }
    button {
      margin-left: auto;
    }
  }
  h1 {
    margin-top: 6px;
    font-family: Metropolis;
    font-weight: 400;
    display: inline;
    font-size: 32px;
  }
`;

const SvgDragHandler = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.33333 5.33333V4H14.6667V5.33333H1.33333ZM1.33333 7.33333V8.66667H14.6667V7.33333H1.33333ZM1.33333 10.6667V12H14.6667V10.6667H1.33333Z"
      fill="black"
    />
  </svg>
);

const SvgLocalization = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 12C2 6.48001 6.46997 2 11.99 2C17.52 2 22 6.48001 22 12C22 17.52 17.52 22 11.99 22C6.46997 22 2 17.52 2 12ZM15.97 8H18.9199C17.96 6.35001 16.4299 5.07001 14.59 4.44C15.1899 5.54999 15.65 6.75 15.97 8ZM12 4.04001C12.83 5.24002 13.48 6.57001 13.9099 8H10.09C10.52 6.57001 11.1699 5.24002 12 4.04001ZM4 12C4 12.69 4.09998 13.36 4.26001 14H7.64001C7.56006 13.34 7.5 12.68 7.5 12C7.5 11.32 7.56006 10.66 7.64001 10H4.26001C4.09998 10.64 4 11.31 4 12ZM5.07996 16H8.02991C8.34998 17.25 8.80994 18.45 9.40991 19.56C7.56995 18.93 6.03992 17.66 5.07996 16ZM5.07996 8H8.02991C8.34998 6.75 8.80994 5.54999 9.40991 4.44C7.56995 5.07001 6.03992 6.34 5.07996 8ZM12 19.96C11.1699 18.76 10.52 17.43 10.09 16H13.9099C13.48 17.43 12.83 18.76 12 19.96ZM9.5 12C9.5 12.68 9.56995 13.34 9.66003 14H14.34C14.4301 13.34 14.5 12.68 14.5 12C14.5 11.32 14.4301 10.65 14.34 10H9.66003C9.56995 10.65 9.5 11.32 9.5 12ZM14.59 19.56C15.1899 18.45 15.65 17.25 15.97 16H18.9199C17.96 17.65 16.4299 18.93 14.59 19.56ZM16.5 12C16.5 12.68 16.4399 13.34 16.36 14H19.74C19.9 13.36 20 12.69 20 12C20 11.31 19.9 10.64 19.74 10H16.36C16.4399 10.66 16.5 11.32 16.5 12Z"
      fill="tomato"
    />
  </svg>
);
