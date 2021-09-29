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

import { startAfter } from "@firebase/firestore";
import { isSlug } from "../../utils/inputValidation";
import { ModelFieldBoard } from "./_components/ModelFieldBoard";

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

              <ModelFieldBoard
                data={data}
                setData={setData}
                showSettings={showSettings}
                setShowSettings={setShowSettings}
              />

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
